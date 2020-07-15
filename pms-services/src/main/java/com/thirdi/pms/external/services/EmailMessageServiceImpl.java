package com.thirdi.pms.external.services;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.logging.Logger;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import com.thirdi.pms.admin.EmailMessage;
import com.thirdi.pms.admin.Recipient;
import com.thirdi.pms.admin.RecipientMail;
import com.thirdi.pms.admin.modal.AppraisalCycle;
import com.thirdi.pms.login.dao.LoginDao;

import freemarker.template.Configuration;
import freemarker.template.Template;

@Service
public class EmailMessageServiceImpl implements EmailMessageService {

	@Autowired
	JavaMailSender mailSender;

	@Autowired
	Configuration fmConfiguration;

	@Autowired
	LoginDao loginDao;

	private static final Logger LOGGER = Logger.getLogger(EmailMessageServiceImpl.class.getName());

	public void sendEmail(List<Recipient> recipientList, EmailMessage mail) {
		try {
			Properties prop = fetchEmailPropertisFromFile();
			if (recipientList != null && recipientList.size() > 0) {
				for (Recipient recipient : recipientList) {
					MimeMessage mimeMessage = mailSender.createMimeMessage();
					MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
					mimeMessageHelper.setSubject(mail.getSubject());
					mimeMessageHelper.setFrom(prop.getProperty("mail.user"));
					mimeMessageHelper.setTo("ppatil@aarete.com");
					//mimeMessageHelper.setTo(recipient.getEmail());
					mail.setMailContent(geContentFromTemplate(prepareParameterMap()));
					mimeMessageHelper.setText(mail.getMailContent(), true);
					mailSender.send(mimeMessageHelper.getMimeMessage());
				}
			}
		} catch (MessagingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private Map<String, Object> prepareParameterMap() {
		Map<String, Object> parameterMap = new HashMap<String, Object>();
		AppraisalCycle activeCycle = loginDao.getCurrentAppraisalCycle();
		if (activeCycle.getCycleName() != null) {
			parameterMap.put("cycleMonth", activeCycle.getCycleName());
		} else {
			parameterMap.put("cycleMonth", "NA");
		}
		if (activeCycle.getEndate() != null) {
			parameterMap.put("cycleEndDate", dateConvert(activeCycle.getEndate()));
		} else {
			parameterMap.put("cycleEndDate", "NA");
		}
		if(activeCycle.getSelfApprEndDate() != null){
			parameterMap.put("selfAssessmentEndDate",dateConvert(activeCycle.getSelfApprEndDate()));
		}
		if (activeCycle.getSelfApprStartDate() != null && activeCycle.getSelfApprEndDate() != null) {
			parameterMap.put("selfAssessmentDuration",
					dateConvert(activeCycle.getSelfApprStartDate()) + " to " + dateConvert(activeCycle.getSelfApprEndDate()));
		} else {
			parameterMap.put("selfAssessmentDuration", "NA");
		}
		if (activeCycle.getMngApprStartDate() != null && activeCycle.getMngApprEndDate() != null) {
			parameterMap.put("appraiserAssessmentDuration",
					dateConvert(activeCycle.getMngApprStartDate()) + " to " + dateConvert(activeCycle.getMngApprEndDate()));
		} else {
			parameterMap.put("appraiserAssessmentDuration", "NA");
		}
		if (activeCycle.getRevApprStartDate() != null && activeCycle.getRevApprEndDate() != null) {
			parameterMap.put("reviewerAssessmentDuration",
					dateConvert(activeCycle.getRevApprStartDate()) + " to " + dateConvert(activeCycle.getRevApprEndDate()));
		} else {
			parameterMap.put("reviewerAssessmentDuration", "NA");
		}
		return parameterMap;
	}

	public String geContentFromTemplate(Map<String, Object> model) {
		StringBuffer content = new StringBuffer();
		try {
			fmConfiguration.setClassForTemplateLoading(this.getClass(), "/template/");
			Template template = fmConfiguration.getTemplate("email_template.txt");
			content.append(FreeMarkerTemplateUtils.processTemplateIntoString(template, model));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return content.toString();
	}

	public Properties fetchEmailPropertisFromFile() throws IOException {
		BufferedInputStream bufferedStream = new BufferedInputStream(
				EmailMessageServiceImpl.class.getResourceAsStream("/email_configuration.properties"));
		Properties properties = new Properties();
		properties.load(bufferedStream);
		Enumeration<Object> enuKeys = properties.keys();
		bufferedStream.close();
		while (enuKeys.hasMoreElements()) {
			String key = (String) enuKeys.nextElement();
			String value = properties.getProperty(key);
			properties.put(key, value);
		}
		return properties;
	}

	public void sendCustomEmail(Recipient recipient, EmailMessage mail) {
		try {
			Properties prop = fetchEmailPropertisFromFile();
			if (recipient != null) {
				MimeMessage mimeMessage = mailSender.createMimeMessage();
				MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
				mimeMessageHelper.setSubject(mail.getSubject());
				mimeMessageHelper.setFrom(prop.getProperty("mail.user"));
				mimeMessageHelper.setTo(recipient.getEmail());
				mail.setMailContent(mail.getMailContent());
				mimeMessageHelper.setText(mail.getMailContent(), true);
				mailSender.send(mimeMessageHelper.getMimeMessage());
			}
		} catch (IOException e) {
			e.printStackTrace();
		} catch (MessagingException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void sendApprEmail(List<RecipientMail> recipientMailList, EmailMessage mail, String date, Integer phaseId) {
		try {
			Properties prop = fetchEmailPropertisFromFile();
			if (recipientMailList != null && recipientMailList.size() > 0) {
				if (phaseId == 1 || phaseId == 2) {
					MimeMessage mimeMessage = mailSender.createMimeMessage();
					MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
					mimeMessageHelper.setSubject(mail.getSubject());
					mimeMessageHelper.setFrom(prop.getProperty("mail.user"));
					mimeMessageHelper.setTo(returnMail(phaseId, recipientMailList).get(0));
					mail.setMailContent(
							getContentFromTemplate(prepareParameterMapForAppr(recipientMailList.get(0), date),
									returnTempleteName(phaseId).get(0)));
					mimeMessageHelper.setText(mail.getMailContent(), true);
					mailSender.send(mimeMessageHelper.getMimeMessage());
				}

				if (phaseId == 1) {
					MimeMessage mimeMessage1 = mailSender.createMimeMessage();
					MimeMessageHelper mimeMessageHelper1 = new MimeMessageHelper(mimeMessage1, true);
					mimeMessageHelper1.setSubject(mail.getSubject());
					mimeMessageHelper1.setFrom(prop.getProperty("mail.user"));
					mimeMessageHelper1.setTo(returnMail(phaseId, recipientMailList).get(1));
					mail.setMailContent(
							getContentFromTemplate(prepareParameterMapForAppr(recipientMailList.get(0), date),
									returnTempleteName(phaseId).get(1)));
					mimeMessageHelper1.setText(mail.getMailContent(), true);
					mailSender.send(mimeMessageHelper1.getMimeMessage());
				}
			}
		} catch (MessagingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public String getContentFromTemplate(Map<String, Object> model, String templeteName) {
		StringBuffer content = new StringBuffer();
		try {
			fmConfiguration.setClassForTemplateLoading(this.getClass(), "/template/");
			Template template = fmConfiguration.getTemplate(templeteName);
			content.append(FreeMarkerTemplateUtils.processTemplateIntoString(template, model));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return content.toString();
	}

	private Map<String, Object> prepareParameterMapForAppr(RecipientMail recipientMail, String date) {
		Map<String, Object> parameterMap = new HashMap<String, Object>();
		AppraisalCycle activeCycle = loginDao.getCurrentAppraisalCycle();
		if (activeCycle.getCycleName() != null) {
			parameterMap.put("cycleMonth",activeCycle.getCycleName());
		} else {
			parameterMap.put("cycleMonth", "NA");
		}
		if (activeCycle.getEndate() != null) {
			parameterMap.put("cycleEndDate", dateConvert(activeCycle.getEndate()));
		} else {
			parameterMap.put("cycleEndDate", "NA");
		}
		if (activeCycle.getSelfApprStartDate() != null && activeCycle.getSelfApprEndDate() != null) {
			parameterMap.put("selfAssessmentDuration",
					dateConvert(activeCycle.getSelfApprStartDate()) + " to " + dateConvert(activeCycle.getSelfApprEndDate()));
		} else {
			parameterMap.put("selfAssessmentDuration", "NA");
		}
		if (activeCycle.getMngApprStartDate() != null && activeCycle.getMngApprEndDate() != null) {
			parameterMap.put("appraiserAssessmentDuration",
					dateConvert(activeCycle.getMngApprStartDate()) + " to " + dateConvert(activeCycle.getMngApprEndDate()));
		} else {
			parameterMap.put("appraiserAssessmentDuration", "NA");
		}
		if (activeCycle.getRevApprStartDate() != null && activeCycle.getRevApprEndDate() != null) {
			parameterMap.put("reviewerAssessmentDuration",
					dateConvert(activeCycle.getRevApprStartDate()) + " to " + dateConvert(activeCycle.getRevApprEndDate()));
		} else {
			parameterMap.put("reviewerAssessmentDuration", "NA");
		}
		if (recipientMail.getSelfEmail() != null) {
			parameterMap.put("selfName", emailName(recipientMail.getSelfEmail()));
		} else {
			parameterMap.put("selfName", "NA");
		}
		if (recipientMail.getApprEmail() != null) {
			parameterMap.put("apprName", emailName(recipientMail.getApprEmail()));
		} else {
			parameterMap.put("apprName", "NA");
		}
		if (recipientMail.getRevEmail() != null) {
			parameterMap.put("revName", emailName(recipientMail.getRevEmail()));
		} else {
			parameterMap.put("revName", "NA");
		}
		if (date != null) {
			parameterMap.put("selfCompletionDate", date);
		} else {
			parameterMap.put("selfCompletionDate", "NA");
		}
		//parameterMap.put("url", "http://172.16.17.78:8080/pms");
		parameterMap.put("url", Constant.PMS_LINK);
		return parameterMap;
	}

	public String emailName(String name) {
		/*String newname = name.split("@")[0];
		return newname.replace(".", " ");*/
		String newname = name.split("@")[0];
		String first = newname.split("\\.")[0];
		String last = newname.split("\\.")[1];
		first = first.substring(0, 1).toUpperCase() + first.substring(1);
		last = last.substring(0, 1).toUpperCase() + last.substring(1);
		return first + " " + last;
	}

	public List<String> returnTempleteName(Integer phaseId) {
		List<String> templeteList = new ArrayList<String>();
		if (phaseId == 1) {
			templeteList.add("selfAck.txt");
			templeteList.add("apprReport.txt");
		} else if (phaseId == 2) {
			templeteList.add("apprAck.txt");
			templeteList.add("revReport.txt");
		} else if (phaseId == 3) {
			templeteList.add("revAck.txt");
			templeteList.add("grpReport.txt");
		}
		return templeteList;
	}

	public List<String> returnMail(Integer phaseId, List<RecipientMail> recipientMailList) {
		List<String> mailList = new ArrayList<String>();
		if (phaseId == 1) {
			mailList.add(recipientMailList.get(0).getSelfEmail());
			mailList.add(recipientMailList.get(0).getApprEmail());
		} else if (phaseId == 2) {
			mailList.add(recipientMailList.get(0).getApprEmail());
			mailList.add(recipientMailList.get(0).getRevEmail());
		} else if (phaseId == 3) {
			mailList.add(recipientMailList.get(0).getRevEmail());
			mailList.add("rushikesh.sabde@the3i.com");
		}
		return mailList;
	}

	public void sendRevTwoEmail(List<Recipient> recipientList, EmailMessage mail, String templeteName) {
		try {
			Properties prop = fetchEmailPropertisFromFile();
			if (recipientList != null && recipientList.size() > 0) {
				for (Recipient recipient : recipientList) {
					MimeMessage mimeMessage = mailSender.createMimeMessage();
					MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
					mimeMessageHelper.setSubject(mail.getSubject());
					mimeMessageHelper.setFrom(prop.getProperty("mail.user"));
					mimeMessageHelper.setTo(recipient.getEmail());
					mail.setMailContent(
							getContentFromTemplate(prepareParameterMapForRevAndMul(recipient), templeteName));
					mimeMessageHelper.setText(mail.getMailContent(), true);
					mailSender.send(mimeMessageHelper.getMimeMessage());
				}
			}
		} catch (MessagingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private Map<String, Object> prepareParameterMapForRevAndMul(Recipient recipient) {
		Map<String, Object> parameterMap = new HashMap<String, Object>();
		AppraisalCycle activeCycle = loginDao.getCurrentAppraisalCycle();
		if (activeCycle.getCycleName() != null) {
			parameterMap.put("cycleMonth", activeCycle.getCycleName());
		} else {
			parameterMap.put("cycleMonth", "NA");
		}
		if (activeCycle.getEndate() != null) {
			parameterMap.put("cycleEndDate", dateConvert(activeCycle.getEndate()));
		} else {
			parameterMap.put("cycleEndDate", "NA");
		}
		if (activeCycle.getSelfApprStartDate() != null && activeCycle.getSelfApprEndDate() != null) {
			parameterMap.put("selfAssessmentDuration",
					dateConvert(activeCycle.getSelfApprStartDate()) + " to " + dateConvert(activeCycle.getSelfApprEndDate()));
		} else {
			parameterMap.put("selfAssessmentDuration", "NA");
		}
		if (activeCycle.getMngApprStartDate() != null && activeCycle.getMngApprEndDate() != null) {
			parameterMap.put("appraiserAssessmentDuration",
					dateConvert(activeCycle.getMngApprStartDate()) + " to " + dateConvert(activeCycle.getMngApprEndDate()));
		} else {
			parameterMap.put("appraiserAssessmentDuration", "NA");
		}
		if (activeCycle.getRevApprStartDate() != null && activeCycle.getRevApprEndDate() != null) {
			parameterMap.put("reviewerAssessmentDuration",
					dateConvert(activeCycle.getRevApprStartDate()) + " to " + dateConvert(activeCycle.getRevApprEndDate()));
		} else {
			parameterMap.put("reviewerAssessmentDuration", "NA");
		}
		if (recipient.getFirstName() + " " + recipient.getLastName() != null) {
			parameterMap.put("selfName", recipient.getFirstName() + " " + recipient.getLastName());
		}
		//parameterMap.put("url", "http://172.16.17.78:8080/pms");
		parameterMap.put("url", Constant.PMS_LINK);
		return parameterMap;
	}

	public String dateConvert(String D){

	       SimpleDateFormat format1 = new SimpleDateFormat("yyyy-MM-dd");
	       SimpleDateFormat format2 = new SimpleDateFormat("dd-MMM-yyyy");
	       Date date = null;
	       try {
	           date = format1.parse(D);
	       } catch (ParseException e) {
	           e.printStackTrace();
	       }
	       String dateString = format2.format(date);
	       dateString = dateString.replace("-", " "); 
	       return ((dateString));
	   }

	
}
