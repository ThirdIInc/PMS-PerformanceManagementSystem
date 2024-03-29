package com.thirdi.pms.admin;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.thirdi.pms.admin.modal.AppraisalCycle;
import com.thirdi.pms.competency.CompetencyDao;
import com.thirdi.pms.competency.CompetencyService;
import com.thirdi.pms.competency.PhaseStatus;
import com.thirdi.pms.external.services.EmailMessageService;
import com.thirdi.pms.login.api.LoginService;
import com.thirdi.pms.login.dao.LoginDao;
import com.thirdi.pms.login.model.EmployeeDetails;

@Service
public class AdminServiceImpl implements AdminService {

	@Autowired
	CompetencyService competencyService;

	@Autowired
	LoginDao loginDao;

	@Autowired
	LoginService loginService;

	@Autowired
	AdminDao adminDao;

	@Autowired
	EmailMessageService emailService;

	@Autowired
	CompetencyDao competenceDao;

	public Map<Integer, JsonObject> fetchAllEmployeeData(Integer currentCycleId) throws ParseException {
		Map<Integer, JsonObject> empDetailsMap = new HashMap<Integer, JsonObject>();
		Map<Integer, Integer> idMap = competencyService.getMappingOfIds();
		Map<Integer, String> userIdNameMap = loginService.getNameOfUserById();
		Set<Integer> allActiveMemberList = loginDao.getActiveEmpMemberIdsSet(currentCycleId);
		Map<Integer, String> functionDataMap = adminDao.getFunctionOfEmployeeWithIdMap();
		List<EmployeeDetails> myTeamDataListUnsorted = loginDao
				.getAllPhaseStatusAndSuperiorsDetailsOfAllTeamMembers(allActiveMemberList);
		if (myTeamDataListUnsorted != null && myTeamDataListUnsorted.size() > 0 && allActiveMemberList != null
				&& allActiveMemberList.size() > 0) {
			for (Integer emp_appr_Id : allActiveMemberList) {
				JsonObject detailsContainer = new JsonObject();
				String phaseStatus = "";
				String completionDate = "";
				String employeeName = "";
				String isProcessCompleted = "Incomplete";
				String function = functionDataMap.get(emp_appr_Id);
				List<EmployeeDetails> allEmpDataList = loginService
						.fetchEmployeeRecordAndSortList(myTeamDataListUnsorted, emp_appr_Id);
				if (allEmpDataList != null && allEmpDataList.size() > 0) {
					for (EmployeeDetails empDetails : allEmpDataList) {
						PhaseStatus phaseName = empDetails.getCurrentPhase();
						Integer progressOfCycle = empDetails.getStatus();
						Integer apprId = empDetails.getNextUserRoleId();
						employeeName = userIdNameMap.get(idMap.get(emp_appr_Id));
						/*
						 * if (empDetails.getCompletionDate() != null &&
						 * empDetails.getCompletionDate() != "") {
						 * completionDate = empDetails.getCompletionDate(); } if
						 * (phaseName == PhaseStatus.Reviewer &&
						 * progressOfCycle.equals(1)) { phaseStatus = "-";
						 * isProcessCompleted = "Completed"; } if ((phaseName ==
						 * PhaseStatus.Appraisar && progressOfCycle.equals(1))
						 * && phaseName == PhaseStatus.Reviewer &&
						 * progressOfCycle.equals(0)) { phaseStatus =
						 * "Reviewer Assessment - pending"; } if ((phaseName ==
						 * PhaseStatus.Self && progressOfCycle.equals(1)) &&
						 * (phaseName == PhaseStatus.Appraisar &&
						 * progressOfCycle.equals(0))) { phaseStatus =
						 * "Appraiser Assessment - pending"; } if (phaseName ==
						 * PhaseStatus.Self && progressOfCycle.equals(0)) {
						 * phaseStatus = "Self Assessment - pending"; }
						 */

						if (empDetails.getCompletionDate() != null) {
							completionDate = empDetails.getCompletionDate();
						}
						if (phaseName == PhaseStatus.Reviewer && progressOfCycle.equals(1)) {
							phaseStatus = "Completed";
						}
						if (phaseName == PhaseStatus.Reviewer && progressOfCycle.equals(0)) {
							phaseStatus = "Reviewer Assessment - pending";
						}
						if ((phaseName == PhaseStatus.Appraisar && progressOfCycle.equals(0))) {
							phaseStatus = "Appraiser Assessment - pending";
						}
						if (phaseName == PhaseStatus.Self && progressOfCycle.equals(0)) {
							phaseStatus = "Self Assessment - pending";
						}
					}
					detailsContainer.addProperty("status", phaseStatus);
					SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
					SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd");
					if (completionDate != null && StringUtils.hasText(completionDate)) {
						completionDate = sdf.format(sdf2.parse(completionDate));
					}
					detailsContainer.addProperty("completionDate", completionDate);
					detailsContainer.addProperty("employeeName", employeeName);
					detailsContainer.addProperty("progress", phaseStatus);
					detailsContainer.addProperty("function", function);
					empDetailsMap.put(emp_appr_Id, detailsContainer);
				}
			}
		}
		return empDetailsMap;
	}

	public Boolean sendEmail(Integer empId) {
		List<Recipient> recipientList = adminDao.fetchAllRrecipients(empId);
		AppraisalCycle currentCycle = loginDao.getCurrentAppraisalCycle();
		EmailMessage mail = new EmailMessage();
		mail.setSubject(currentCycle.getCycleName());
		emailService.sendEmail(recipientList, mail);
		return true;
	}

	public Boolean sendEmailToAll() {
		List<Recipient> recipientList = adminDao.fetchAllRrecipients(null);
		AppraisalCycle currentCycle = loginDao.getCurrentAppraisalCycle();
		EmailMessage mail = new EmailMessage();
		mail.setSubject(currentCycle.getCycleName());
		emailService.sendEmail(recipientList, mail);
		return true;
	}

	@Transactional(readOnly = true)
	public Map<Integer, JsonObject> generateMetricsSheetData(Integer cycleId) {
		Map<Integer, JsonObject> metricSheetDataMap = new HashMap<Integer, JsonObject>();
		Map<Integer, Integer> idMap = competencyService.getMappingOfIds();
		Map<Integer, String> userIdNameMap = loginService.getNameOfUserById();
		Map<Integer, String> designationNameMap = loginService.getDesignationOfUserById();
		Map<Integer, String> Remark = competencyService.getRemarkOfUserById(cycleId);
		Set<Integer> allActiveMemberSet = loginDao.getActiveEmpMemberIdsSet(cycleId);
		Map<Integer, Double[]> finalRatingsMap = competencyService.getMapOfFinalScore(cycleId);
		List<EmployeeDetails> myTeamDataListUnsorted = loginDao
				.getAllPhaseStatusAndSuperiorsDetailsOfAllTeamMembers(allActiveMemberSet);
		if (myTeamDataListUnsorted != null && myTeamDataListUnsorted.size() > 0 && allActiveMemberSet != null
				&& allActiveMemberSet.size() > 0) {
			for (Integer emp_appr_Id : allActiveMemberSet) {
				JsonObject detailsContainer = new JsonObject();
				String appraiserName = "";
				String employeeName = "";
				String reviewerName = "";
				String designationName = "";
				List<EmployeeDetails> myTeamDataList = loginService
						.fetchEmployeeRecordAndSortList(myTeamDataListUnsorted, emp_appr_Id);
				if (myTeamDataList != null && myTeamDataList.size() > 0) {
					for (EmployeeDetails empDetails : myTeamDataList) {
						PhaseStatus phaseName = empDetails.getCurrentPhase();
						Integer apprId = empDetails.getNextUserRoleId();
						employeeName = userIdNameMap.get(idMap.get(emp_appr_Id));
						designationName = designationNameMap.get(idMap.get(emp_appr_Id));

						if (phaseName == PhaseStatus.Appraisar) {
							if (userIdNameMap.get(apprId) != null) {
								appraiserName = userIdNameMap.get(apprId);
							} else {
								appraiserName = "-";
							}

						}
						if (phaseName == PhaseStatus.Reviewer) {
							if (userIdNameMap.get(apprId) != null) {
								reviewerName = userIdNameMap.get(apprId);
							} else {
								reviewerName = "-";
							}
						}
						
					/*	if (appraiserName.equals("") && reviewerName.equals("")) {
							detailsContainer.addProperty("appraiserName", "-");
							detailsContainer.addProperty("employeeName", employeeName);
							detailsContainer.addProperty("reviewerName", "-");
							detailsContainer.addProperty("designationName", designationName);
						}*/
						if (appraiserName.equals("")) {	
							
							detailsContainer.addProperty("appraiserName", "-");
							detailsContainer.addProperty("employeeName", employeeName);
							detailsContainer.addProperty("designationName", designationName);
						}
							else if (reviewerName.equals("")) {
							detailsContainer.addProperty("appraiserName", appraiserName);
							detailsContainer.addProperty("reviewerName", appraiserName);
							detailsContainer.addProperty("employeeName", employeeName);
							detailsContainer.addProperty("designationName", designationName);
						
						
						}
						
						else {
							detailsContainer.addProperty("appraiserName", appraiserName);
							detailsContainer.addProperty("employeeName", employeeName);
							detailsContainer.addProperty("reviewerName", reviewerName);
							detailsContainer.addProperty("designationName", designationName);

						}
					}
					Double[] scoreContainer = finalRatingsMap.get(emp_appr_Id);
					if (scoreContainer != null) {
						detailsContainer.addProperty("selfScore", scoreContainer[0]);
						detailsContainer.addProperty("mngScore", scoreContainer[1]);
						detailsContainer.addProperty("revScore", scoreContainer[2]);
						detailsContainer.addProperty("rev2score", scoreContainer[3]);
					} else {
						detailsContainer.addProperty("selfScore", "0");
						detailsContainer.addProperty("mngScore", "0");
						detailsContainer.addProperty("revScore", "0");
						detailsContainer.addProperty("rev2score", "0");
					}

					String remarkContainer = Remark.get(emp_appr_Id);
					if (remarkContainer != null) {
						detailsContainer.addProperty("revRemarks", remarkContainer);
					} else {
						detailsContainer.addProperty("revRemarks", "-");
					}

					metricSheetDataMap.put(emp_appr_Id, detailsContainer);
				}
			}
		}
		return metricSheetDataMap;
	}

	// new method fill data- for initinal fill up of data after cycle creation
	public Boolean createCycle(Map<String, String> cycleDataMap) {
		Boolean returnedValue = null;
		if (cycleDataMap != null && cycleDataMap.size() > 0) {
			returnedValue = adminDao.creatNewCycle(cycleDataMap);
			adminDao.fillData();
		}
		return returnedValue;
	}

	public Boolean stopOtherRunningCycle() {
		return adminDao.stopOtherCycle();
	}

	public Boolean updateReviewerRatings(Integer empId, Float ratings, Integer revId, Integer cycleId) {
		return competenceDao.updateReviewerRatings(empId, ratings, revId, cycleId);
	}

	public Boolean updateReviewerRemarks(Integer empId, String remarks, Integer revId, Integer cycleId) {
		return competenceDao.updateReviewerRemarks(empId, remarks, revId, cycleId);
	}

	public Map<Integer, String> getEmployeesAboveConsultantProfie() {
		return adminDao.getEmployeesAboveConsultantProfie();
	}

	public Map<Integer, String> getHRAdminMember() {
		return adminDao.getHRAdminMember();
	}

	public Map<Integer, String> getAllActiveEmployees() {
		return adminDao.getAllActiveEmployees();
	}

	public Boolean mapEmployeeWithReviewer(String revId, String empList) {
		Integer reviewerId = Integer.parseInt(revId);
		Integer runningCycleId = loginDao.getCurrentAppraisalCycle().getCycleId();
		List<Integer> employeeList = new ArrayList<Integer>();
		for (String empId : empList.split(",")) {
			employeeList.add(Integer.parseInt(empId));
		}
		Boolean responseFlag = adminDao.mapEmployeeWithReviewer(employeeList, reviewerId, runningCycleId);
		return responseFlag;
	}

	public List<Integer> getEmployeesMappedWithReviewer(Integer reviewerId) {
		if (reviewerId != null) {
			return adminDao.getEmployeesMappedWithReviewer(reviewerId);
		}
		return null;
	}

	public Boolean mapReviewerwithHRAdmin(String hrAdminId, String revList) {
		Integer hrId = Integer.parseInt(hrAdminId);
		Integer runningCycleId = loginDao.getCurrentAppraisalCycle().getCycleId();
		List<Integer> reviewerList = new ArrayList<Integer>();
		for (String revId : revList.split(",")) {
			reviewerList.add(Integer.parseInt(revId));
		}
		Boolean responseFlag = adminDao.mapReviewerWithHRAdmin(reviewerList, hrId, runningCycleId);
		Boolean responseFlag2 = sendMailToReviewer(reviewerList);
		return responseFlag && responseFlag2;
	}

	public List<Integer> getReviewersMappedWithHRAdmin(Integer hrId) {
		if (hrId != null) {
			return adminDao.getReviewersMappedWithHRAdmin(hrId);
		}
		return null;
	}

	public Boolean sendEmailToAnEmployee(int empId, String subject, String message) {
		List<Recipient> recipientList = adminDao.fetchAllRrecipients(empId);
		EmailMessage emailObject = new EmailMessage();
		emailObject.setSubject(subject);
		emailObject.setMailContent(message);
		emailService.sendCustomEmail(recipientList.get(0), emailObject);
		return true;
	}

	public Boolean sendMailToReviewer(List<Integer> reviewerList) {
		List<Recipient> recipientList = adminDao.fetchAllLevelTwoReviewer(reviewerList);
		AppraisalCycle currentCycle = loginDao.getCurrentAppraisalCycle();
		EmailMessage mail = new EmailMessage();
		mail.setSubject(currentCycle.getCycleName());
		emailService.sendRevTwoEmail(recipientList, mail, "reviewercommitee.txt");
		return true;
	}

	public void sendReminderMailToReviewer() {
		List<Recipient> recipientList = adminDao.fetchAllRecipientsForReviewerReminder();
		AppraisalCycle currentCycle = loginDao.getCurrentAppraisalCycle();
		EmailMessage mail = new EmailMessage();
		mail.setSubject("Reminder" + currentCycle.getCycleName());
		emailService.sendRevTwoEmail(recipientList, mail, "reviewerreminder.txt");
	}

	public Boolean sendEmailSelectedEmployee(String empList) {
		List<Integer> reviewerList = new ArrayList<Integer>();
		for (String revId : empList.split(",")) {
			reviewerList.add(Integer.parseInt(revId));
		}
		Boolean responseFlag2 = sendMailToSelectedEmployees(reviewerList);
		return responseFlag2;
	}

	public Boolean sendMailToSelectedEmployees(List<Integer> employeeList) {
		List<Recipient> recipientList = adminDao.fetchAllLevelTwoReviewer(employeeList);
		AppraisalCycle currentCycle = loginDao.getCurrentAppraisalCycle();
		EmailMessage mail = new EmailMessage();
		mail.setSubject(currentCycle.getCycleName());
		emailService.sendRevTwoEmail(recipientList, mail, "reminderToEmployeeList.txt");
		return true;
	}
}
