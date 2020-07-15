/**
 * 
 */

var currentPhase = null;
var qIdForModal = null;
var sectionForModal = null;
var empIdForModal = null;
var totalScoreContainer = [];
var isDashboardActive = false;
var isFinalized = false;
var viewFlag = true;  // show and hide PI.
var hasBackAndForth = false;
var teamMemberId = null;
var empRole = null;
var currentqId=null;
var currentQuestion=null;
var currentInfoqId = null;
var currentInfoQuestionTitle = null;
var firstQuestion = new Array();
var lastQuestion = new Array();
var isDriectorFlag = null;
var empStatusObject = new Object();
var currentEmpId = null;
var booleanForToster = true;
var isFilledObjective=null;
var isFilledSubjective=null
var selfStatus=null;
var sessionStrengthAnsWeaknessMap = new Map();
var userGeneralInfoObject = new Object();
function prepareCompetencyCache(){
	
	var cache = {
		appraisalList : [],
		questionMap : {},
		sectionMap :  {},
		finalScoreMap : {},
		dataStorageMap : null,
		phaseScoreContainer : [],
		piIndicatorsMap : {},
		sequentialQuestionsMap : {},
		questionRatingStatusMap : {},
		strengthAndWeaknessServerDataMap : {},
		questionSectionStorageMap : null,
		strengthAnsWeaknessMap : null,
		overviewCustomizedMap : {"33":"Achievements","34":"Values","35":"Feedback","36":"Objectives"},
		getSectionAndQuestions : function(){
			var dataMap = cache.sectionMap;
			if(dataMap != undefined && dataMap != null && !jQuery.isEmptyObject(dataMap)){
				return dataMap;
			}else{
				getCompetencyDataFromServer();
				return cache.sectionMap;
			}
		},
		getQuestionFromId : function(){
			var dataMap = eval(cache.questionMap);
			if(dataMap != undefined && dataMap != null && !jQuery.isEmptyObject(dataMap)){
				return dataMap;
			}else{
				getCompetencyDataFromServer();
				return cache.questionMap;
			}
		},
		getFinalScoreMap : function(){
			var dataMap = cache.finalScoreMap;
			if(dataMap != undefined && dataMap != null && !jQuery.isEmptyObject(dataMap)){
				return dataMap;
			}else{
				getCompetencyDataFromServer();
				return cache.finalScoreMap; 
			}
		},
		getDataStorageMap : function(){
			var cachedDataMap = cache.dataStorageMap;
			if(cachedDataMap == undefined && cachedDataMap == null){
				cache.dataStorageMap = new Map();
				return cache.dataStorageMap;
			}
			return cachedDataMap;
		},
		getEachPhaseFinalScore : function(){
			var cachedDataArray = cache.phaseScoreContainer;
			if(cachedDataArray != undefined && cachedDataArray != null && !jQuery.isEmptyObject(cachedDataArray)){
				return cachedDataArray;
			}else{
				getCompetencyDataFromServer();
				return cache.phaseScoreContainer; 
			}
		},
		getPerformanceIndicatorsMap : function(){
			var cachedDataMap = cache.piIndicatorsMap;
			if(cachedDataMap != undefined && cachedDataMap != null && !jQuery.isEmptyObject(cachedDataMap)){
				return cachedDataMap;
			}else{
				getCompetencyDataFromServer();
				return cache.piIndicatorsMap; 
			}
		},
		emptyAllExistedValue : function(){
			cache.sectionMap = {},cache.questionMap = {},cache.finalScoreMap={},cache.piIndicatorsMap={},
			cache.phaseScoreContainer={};
		},
		getMapOfQuestionIsRatedOrNot : function(){
			var cachedDataMap = cache.questionRatingStatusMap;
			if(cachedDataMap != undefined && cachedDataMap != null && !jQuery.isEmptyObject(cachedDataMap)){
				return cachedDataMap;
			}else{
				getCompetencyDataFromServer();
				return cache.questionRatingStatusMap; 
			}
		},
		
		getStrengthAndWeaknessMap : function(){
			
			var cachedDataMap = cache.strengthAnsWeaknessMap;
			if(cachedDataMap == undefined || cachedDataMap == null){
				if((sessionStorage.myMap!=null && sessionStorage.myMap!=undefined)){
					cache.strengthAnsWeaknessMap = new Map(JSON.parse(sessionStorage.myMap));
				}else{
					cache.strengthAnsWeaknessMap = new Map();
				}	
			}
			return cache.strengthAnsWeaknessMap;
		},
		getStrengthAndWeaknessServerDataMap : function(){
			
			var cachedDataMap = cache.strengthAndWeaknessServerDataMap;
			if(cachedDataMap != undefined && cachedDataMap != null && !jQuery.isEmptyObject(cachedDataMap)){
				return cachedDataMap;
			}else{
				getCompetencyDataFromServer();
				return cache.strengthAndWeaknessServerDataMap; 
			}
		},
		getSectionDataStorageMap : function(){
			var cachedDataMap = cache.questionSectionStorageMap;
			if(cachedDataMap == undefined && cachedDataMap == null){
				cache.questionSectionStorageMap = new Map();
				return cache.questionSectionStorageMap;
			}
			return cachedDataMap;
		}
	}
	return cache;
}

function setSelfStatus(status){
this.selfStatus = status;
}

function setUserGeneralInfo(userGeneralInfo){
	this.userGeneralInfoObject =userGeneralInfo;
}
function showDashboard(){
	debugger
	$('#headerOfFullContentDiv').html('');
	$('#fullContentDiv').html('');
	changeLogoStyleForDashboard();
	var userrole= user.role;
	var dashboardDiv = $('<div id="dashboardDiv" class="container-fluid" style="background:white;padding-left:0px !important;padding-right:0px !important ;"></div>');
	var errorDiv = $('<div id="errorDiv" class="container-fluid" style="background:white;padding-left:0px !important;padding-right:0px !important;"></div>');
	var reviewCycleName = apprCycle.cycleName;
	var titleDiv = $('<div class="col-sm-12" style="border-top:2px solid #3a97d3; width:15s%"></div>');
	var titleDivLabel = $('<label class="pull-left" style="margin-top:1%;padding-top:3px;font-size:16px;font-weight:800;padding-left:13px;height:55px;font-family:Nunito Sans;color: #4A4A4A;" ></label>').html("<p style='margin: 0 0 0px;font-size:14px;font-weight:500;font-family:Nunito Sans;color: #4A4A4A;'>Summary Cycle </p>"+'<span id="cycleprintname" style="color: #4A4A4A;font-family:Nunito Sans;font-weight: 800;">'+reviewCycleName+'<b>');
	titleDiv.append(titleDivLabel);
	var headerDiv = $('<div class="col-sm-12" style="height:40px;margin-top:1%;background-color: #f9f9f9;padding-top:1%;font-size: 12.5px;">');
	var header1 = $('<div class="col-sm-3 header" style="height:40px;float:left;text-align:left;font-weight:700;font-family:Nunito Sans;color: #4A4A4A;">').html('<p style="font-weight: 630;font-family: Nunito Sans;color: #4A4A4A;">ASSOCIATE</p>');
	var header2 = $('<div class="col-sm-2" style="height:40px;float:left;text-align:left;font-weight:700;font-family:Nunito Sans;color: #4A4A4A;padding-right:2%;">').html('<p style="font-weight: 630;font-family: "Nunito Sans";color: #4A4A4A;">APPRAISER</p>');
	var header3 = $('<div class="col-sm-1" style="height:40px;float:left;text-align:center;font-weight:500;">').html("");
	var header4 = $('<div class="col-sm-4" style="height:40px;float:left;text-align:center;font-weight:700;font-family:Nunito Sans;color: #4A4A4A;">').html('<p style="font-weight: 630;font-family: Nunito Sans;color: #4A4A4A;">STATUS</p>');
	var header5 = $('<div class="col-sm-2" style="height:40px;float:left;text-align:center;font-weight:700;font-family:Nunito Sans;color: #4A4A4A;">').html('<p style="font-weight: 630;font-family: Nunito Sans;color: #4A4A4A;">COMPLETION DATE</p>');
    if(userGeneralInfo!=undefined){
    	setUserGeneralInfo(userGeneralInfo);
    }
    else{
    	userGeneralInfo = this.userGeneralInfoObject;
    }
	var employeeName = userGeneralInfo["employeeName"];
	var appraiserName = userGeneralInfo["appraiserName"];
	if(appraiserName==null||appraiserName==undefined||appraiserName==""){
	$("#headerOfFullContentDiv").hide();
	$("#fullContentDiv").css("padding-top","15px");
	$("#myformImage").hide();
	$("#myformImage").prop('disabled', true);
	$("#myformImage").css('cursor','default');
	this.isDriectorFlag = true;
	}	
	var status = userGeneralInfo["status"];
	setSelfStatus(status);
	this.empStatusObject["self"] = this.selfStatus;
	var completionDate = userGeneralInfo["completionDate"];
	var contentDiv = $('<div class="col-sm-12" style="height:40px;padding-top:1%;">');
	var empNameContainer = $('<div class="col-sm-2" style="height:40px;text-align:left;vertical-align:middle;float:left;">');
	var shortEmpName = longName(employeeName);
	var empNameLabel = $('<label onclick="showCompetencies()" style="cursor:pointer;width:100%;height:40px;text-align:left;font-weight:400;">'+shortEmpName+'<label>');
	// var editLabel = $('<label onclick="showCompetencies()"
	// style="width:100%;height:40px;text-align:left;font-weight:400;"><label>');
	empNameContainer.append(empNameLabel);
	var editLableContainer = $('<div class="col-sm-1" onclick="showCompetencies()" style="cursor:pointer;height:40px;text-align:left;vertical-align:left;float:left;padding-right:1%;"><img src="images/Edit.svg" style="width:20%;margin-right:0.5%;"></img>');
	var shortApprName = longName(appraiserName);
	var apprNameContainer = $('<div class="col-sm-3" style="height:40px;text-align:left;vertical-align:middle;float:left;padding-right:1%;">').html(shortApprName);
	var goalStatusContainer = $('<div class="col-sm-1" style="height:40px;text-align:center;vertical-align:middle;float:left;">').html("-");
	var reviewStatusContainer = $('<div class="col-sm-4" style="height:40px;text-align:center;vertical-align:middle;float:left;">').html(status);
	var completionDateContainer = $('<div class="col-sm-2" style="height:40px;padding-right:60px;text-align:center;vertical-align:middle;float:left;">').html(completionDate);
	if(status.includes("pending")){
		var newstatus = status.replace(' - pending','');
		var label = $('<label style="width:100%;font-weight:400;padding-left: 88px;">').html(newstatus+' ');
		
	}
	else
		{
		var newstatus = status;
		var label = $('<label style="width:100%;font-weight:400;padding-left: 25px;">').html(newstatus+' ');
		
		}
		
	var statusLabel 
	if(status == "Self Assessment - pending"||status == "Appraiser Assessment - pending"||status == "Reviewer Assessment - pending"){
		label.append('<img src="images/pending.svg" style="width:50.5px;height:17px;margin-left:10px">');
	}
	reviewStatusContainer.html(label);
	headerDiv.append(header1);
	headerDiv.append(header2);
	headerDiv.append(header3);
	headerDiv.append(header4);
	headerDiv.append(header5);
	if(userGeneralInfo == undefined || userGeneralInfo == null || jQuery.isEmptyObject(userGeneralInfo)){
		var noDataLabel = $('<label style="width:100%;text-align:center;">').html("No data available");
		contentDiv.append(noDataLabel)
	}else{
		contentDiv.append(empNameContainer);
		contentDiv.append(editLableContainer);
		contentDiv.append(apprNameContainer);
		// contentDiv.append(goalStatusContainer);
		contentDiv.append(reviewStatusContainer);
		contentDiv.append(completionDateContainer);
	}
	dashboardDiv.append(titleDiv);
	dashboardDiv.append(headerDiv);
	dashboardDiv.append(contentDiv);
	$('#headerOfFullContentDiv').append(dashboardDiv);
	var numberOfTeamMembers = Object.keys(myTeamDataMap).length;
	if((numberOfTeamMembers!=null && numberOfTeamMembers!="")){
		previewMyTeamDetails();
	}
	fillColorLines();
	/*
	 * if(empStatusObject.self=="Self Assessment - pending"){
	 * $("#teamDetailsContentDiv").hide(); $("#disclamer").show(); } else{
	 * $("#teamDetailsContentDiv").show(); $("#disclamer").hide(); }
	 */
}

function longName(name){
	if(name.length>20){
		var words = name.split(" ");
	    var newName = words[0]+" "+words[1].substring(0,1)+".";
	    return newName;
	}
	else{
		return name;
	}
}

function fillColorLines(){
	debugger
	var currentDate = new Date();
	var SelfApprStartDate = new Date(moment(apprCycle.selfApprStartDate).format('DD-MMM-YY'))
	var SelfApprEndDate=new Date(moment(apprCycle.selfApprEndDate).format('DD-MMM-YY'));
	var MngApprStartDate = new Date(moment(apprCycle.mngApprStartDate).format('DD-MMM-YY'))
	var MngApprEndDate= new Date(moment(apprCycle.mngApprEndDate).format('DD-MMM-YY'));
	var RevApprStartDate = new Date(moment(apprCycle.revApprStartDate).format('DD-MMM-YY'));
	var RevApprEndDate = new Date(moment(apprCycle.revApprEndDate).format('DD-MMM-YY'));
	var cycleEndDate = new Date(moment(apprCycle.endate).format('DD-MMM-YY'));
	SelfApprEndDate = SelfApprEndDate.addDays(1);
	MngApprEndDate = MngApprEndDate.addDays(1);
	RevApprEndDate = RevApprEndDate.addDays(1)

    if(currentDate>=SelfApprEndDate){
        $("#line1").css("border-top","1.5px solid #64C494");
    }

    if(currentDate>=MngApprEndDate){
    	$("#line1").css("border-top","1.5px solid #64C494");
        $("#line2").css("border-top","1.5px solid #64C494");
    }

    if(currentDate>=RevApprEndDate){
    	$("#line1").css("border-top","1.5px solid #64C494");
        $("#line2").css("border-top","1.5px solid #64C494");
        $("#line3").css("border-top","1.5px solid #64C494");
    }
}

function previewMyTeamDetails(){	
	debugger
	$('#fullContentDiv').html('');
	var dashboardDiv = $('<div id="teamDetailsDiv" class="container-fluid" style="background:white;padding-left:0px !important;padding-right:0px !important;"></div>');
	var errorDiv = $('<div class="container-fluid" style="background:white;padding-left:0px !important;padding-right:0px !important;"></div>');
	var titleDiv = $('<div class="col-sm-12" style="border-top:2px solid #3a97d3;"></div>');
	var numberOfTeamMembers = Object.keys(myTeamDataMap).length;
	if(numberOfTeamMembers==1){
	var titleDivLabel = $('<label class="pull-left" style="margin-top:1%;padding-top:5px;font-size:16px;height:55px;padding-left:13px;font-weight:500;font-family:Nunito Sans;color: #4A4A4A;" ></label>').html("<p style='margin: 0 0 0px;height:18px;color:#4A4A4A;font-family:Nunito Sans;font-size:14px;line-height:18px;'>My Team's Appraisal</p>"+"<span style='height:23px;width:160px;color:#4A4A4A;font-family:Nunito Sans;font-size:17.07px;font-weight:800;line-height:23px;'>Team Member - "+numberOfTeamMembers+"</span>");
	}
	else{
	var titleDivLabel = $('<label class="pull-left" style="margin-top:1%;padding-top:5px;font-size:16px;height:55px;padding-left:13px;font-weight:500;font-family:Nunito Sans;color: #4A4A4A;" ></label>').html("<p style='margin: 0 0 0px;height:18px;color:#4A4A4A;font-family:Nunito Sans;font-size:14px;line-height:18px;'>My Team's Appraisal</p>"+"<span style='height:23px;width:160px;color:#4A4A4A;font-family:Nunito Sans;font-size:17.07px;font-weight:800;line-height:23px;'>Team Members - "+numberOfTeamMembers+"</span>");
	}
	titleDiv.append(titleDivLabel);
	var headerDiv = $('<div class="col-sm-12" style="height:40px;font-size: 13px;margin-top:1%;background:#F7F7F7;padding-top:1%;">');
	var header1 = $('<div class="col-sm-3" style="height:40px;float:left;font-weight:700;font-family:Nunito Sans;color:#4A4A4A;">').html("ASSOCIATE");
	var header2 = $('<div class="col-sm-2" style="height:40px;float:left;font-weight:700;font-family:Nunito Sans;color: #4A4A4A;">').html("APPRAISER");
	var header3 = $('<div class="col-sm-1" style="height:40px;float:left;text-align:center;font-weight:700;font-family:Nunito Sans;color: #4A4A4A;">').html("MY ROLE");
	// var header4 = $('<div class="col-sm-1"
	// style="height:40px;float:left;text-align:center;font-weight:500;">').html("Goals");
	var header5 = $('<div class="col-sm-4" style="height:40px;float:left;text-align:center;font-weight:700;font-family:Nunito Sans;color: #4A4A4A;">').html("STATUS");
	var header6 = $('<div class="col-sm-2" style="height:40px;float:left;text-align:center;font-weight:700;font-family:Nunito Sans;color: #4A4A4A;">').html("COMPLETION DATE");
	headerDiv.append(header1);
	headerDiv.append(header2);
	headerDiv.append(header3);
	// headerDiv.append(header4);
	headerDiv.append(header5);
	headerDiv.append(header6);
	dashboardDiv.append(titleDiv);
	dashboardDiv.append(headerDiv);
	var contentDiv = renderMyTeamData();
	if(myTeamDataMap == undefined || myTeamDataMap == null || jQuery.isEmptyObject(myTeamDataMap)){
		var noDataLabel = $('<label style="width:100%;text-align:center;padding-top:1%;">').html("No data available");
		errorDiv.append(noDataLabel);
		dashboardDiv.append(errorDiv);
	}else{
		dashboardDiv.append(contentDiv);
	}

	$('#fullContentDiv').append(dashboardDiv);
	contentDiv.prop('disabled',true).off('click');
	
}

function renderMyTeamData(){
	debugger
	var dashboardDiv = $('<div id="teamDetailsContentDiv" class="col-sm-12" style="background:white;padding-left:0px !important;padding-right:0px !important;height:400px; overflow-y:auto;max-height:250px;">');
	if(myTeamDataMap != undefined && myTeamDataMap != null && !jQuery.isEmptyObject(myTeamDataMap)){
		for(var empId in myTeamDataMap){
			var contentDiv = $('<div id="contentDivTeam" class="col-sm-12" style="height:40px;padding-top:1%;">');
			var teamDataJson = myTeamDataMap[empId];
			var employeeName = teamDataJson["employeeName"];
			var appraiserName = teamDataJson["appraiserName"];
			var status = teamDataJson["status"];
			var myrole = teamDataJson["role"];
			var completionDate = teamDataJson["completionDate"];
			var empShortName = longName(employeeName);
			var apprShortName = longName(appraiserName)
			var empNameContainer = $('<div class="col-sm-2" style="height:40px;vertical-align:middle;float:left;word-wrap: break-word;">');
			var empNameLabel = $('<label onclick="showCompetencies(\''+empId+'\',\''+myrole+'\')" style="width:100%;height:40px;font-weight:400;cursor:pointer;">'+employeeName+'<label>');
			empNameContainer.append(empNameLabel);
			var editLableContainer = $('<div class="col-sm-1"onclick="showCompetencies(\''+empId+'\',\''+myrole+'\')" style="cursor:pointer;height:40px;text-align:left;vertical-align:left;float:left;padding-right:1%;"><img src="images/Edit.svg" style="width:20%;margin-right:0.5%;"></img>');
			if(checkSelfFormIsFilled()==true){
				empNameLabel.prop("onclick", null).off("click");
				empNameLabel.css("cursor","not-allowed");
				editLableContainer.prop("onclick", null).off("click");
				editLableContainer.css("cursor","not-allowed");
				 empNameLabel.on("click",function() {
					showToster('Warning !', "Please fill the self form to edit team member's form", 5, "warning");
					});
					editLableContainer.on("click",function() {
					showToster('Warning !', "Please fill the self form to edit team member's form", 5, "warning");
					});
				}
			else if(status=="Self Assessment - pending"){
				empNameLabel.prop("onclick", null).off("click");
				empNameLabel.css("cursor","not-allowed");
				empNameLabel.on("click",function() {
				showToster('Warning !', "Your sub-ordinate have not filled self appraiser form yet", 5, "warning");
				});
				editLableContainer.prop("onclick", null).off("click");
				editLableContainer.css("cursor","not-allowed");
				editLableContainer.on("click",function() {
				showToster('Warning !', "Your sub-ordinate have not filled self appraiser form yet", 5, "warning");
				});
				}
			var apprNameContainer = $('<div class="col-sm-2"  style="height:40px;vertical-align:middle;float:left;word-wrap: break-word;">').html(apprShortName);
			var reviewStatusContainer = $('<div class="col-sm-4" style="height:40px;text-align:center;vertical-align:middle;float:left;word-wrap: break-word;">');
			if(status.includes("pending")){
				var newstatus= status.replace(' - pending','');
				var label = $('<label style="width:85%;font-weight:400;padding-left: 88px;">').html(newstatus+'  ');
				
			}
			else
			{
			var newstatus = status;
			var label = $('<label style="width:100%;font-weight:400;padding-left: 25px;">').html(newstatus+' ');
			
			}
		
			// for pending label
			if(status == "Self Assessment - pending"||status == "Reviewer Assessment - pending"||status == "Appraiser Assessment - pending"){
				label.append('<img src="images/pending.svg" style="width:50.5px;height:17px;margin-left:10px">');
			}
			reviewStatusContainer.html(label);
			var completionDateContainer = $('<div class="col-sm-2" style="height:40px;padding-right:60px;text-align:center;vertical-align:middle;float:left;word-wrap: break-word;">').html(completionDate);
			var myRoleContainer = $('<div class="col-sm-1" style="height:40px;text-align:center;vertical-align:middle;float:left;word-wrap: break-word;">').html(myrole);
			contentDiv.append(empNameContainer);
			contentDiv.append(editLableContainer);
			contentDiv.append(apprNameContainer);
			contentDiv.append(myRoleContainer);
			// contentDiv.append(goalStatusContainer);
			contentDiv.append(reviewStatusContainer);
			contentDiv.append(completionDateContainer);
		    dashboardDiv.append(contentDiv);
		    $("#contentDivTeam").prop('disabled',true).off('click');
		    $('#teamDetailsContentDiv').DataTable();
		   
		}
	}
	return dashboardDiv;
}

function changeLogoStyleForDashboard(){
	$('#myformImage').attr("src","images/Document-icon.svg");
	$('#dashboardImage').attr("src","images/Analytics-icon-blue.svg");
	$('#goalImage').attr("src","images/goal.png");
	$('#historyImage').attr("src","images/history.png");
	$('#feedbackImage').attr("src","images/feedback.png");
}

function changeLogoStyleForCompetency(){
	$('#myformImage').attr("src","images/Document-icon-blue.svg");
	$('#dashboardImage').attr("src","images/Analytics-icon-black.svg");
	$('#goalImage').attr("src","images/goal.png");
	$('#historyImage').attr("src","images/history.png");
	$('#feedbackImage').attr("src","images/feedback.png");
	$('#dashboard').removeClass("active");
	$('#goal').removeClass("active");
	$('#history').removeClass("active");
	$('#logbook').removeClass("active");
}


function changeLogoStyleForGoal(){
	$('#myformImage').attr("src","images/my-form.png");
	$('#dashboardImage').attr("src","images/introduction.png");
	$('#goalImage').attr("src","images/goal-color.png");
	$('#historyImage').attr("src","images/history.png");
	$('#feedbackImage').attr("src","images/feedback.png");
	$('#goal').addClass("active");
	$('#competency').removeClass("active");
	$('#dashboard').removeClass("active");
	$('#history').removeClass("active");
	$('#logbook').removeClass("active");
}
function changeLogoStyleForHistory(){
	$('#myformImage').attr("src","images/my-form.png");
	$('#dashboardImage').attr("src","images/introduction.png");
	$('#goalImage').attr("src","images/goal.png");
	$('#historyImage').attr("src","images/history-color.png");
	$('#feedbackImage').attr("src","images/feedback.png");
	$('#history').addClass("active");
	$('#competency').removeClass("active");
	$('#goal').removeClass("active");
	$('#dashboard').removeClass("active");
	$('#logbook').removeClass("active");
}


function changeLogoStyleForLogbook(){
	$('#myformImage').attr("src","images/my-form.png");
	$('#dashboardImage').attr("src","images/introduction.png");
	$('#goalImage').attr("src","images/goal.png");
	$('#historyImage').attr("src","images/history.png");
	$('#feedbackImage').attr("src","images/feedback-color.png");
	$('#logbook').addClass("active");
	$('#history').removeClass("active");
	$('#competency').removeClass("active");
	$('#goal').removeClass("active");
	$('#dashboard').removeClass("active");
}

function showGoal(){
changeLogoStyleForGoal();
}

function showHistory(){
changeLogoStyleForHistory();
}


function showLogbook(){
changeLogoStyleForLogbook();	
}
var userName;
var employeeName; 
function userNameSetter(userName){
	this.userName = userName
}
function employeeNameSetter(employeeName){
	this.employeeName = employeeName
}

function showCompetencies(employeeId,roleFromDashboard){	
	debugger
	
	if(employeeId!=null||employeeId!=undefined){
		this.currentEmpId =  employeeId;
		}
	this.qIdForModal=null;
	$('#headerOfFullContentDiv').html('');
	$('#fullContentDiv').html('');
	if(this.isDriectorFlag==true){
		$("#headerOfFullContentDiv").show();
		}
	appendSubmitButtonOnTop();
	highlightCompetencyLabel();
	changeLogoStyleForCompetency();
	checkSelfFormOrAppraiserForm(employeeId);
	if(roleFromDashboard != null && roleFromDashboard != ""){
		empRole = roleFromDashboard;
	}
	if(typeof(userGeneralInfo)!="undefined"){
		var userName = userGeneralInfo["employeeName"];
		userNameSetter(userName);
		if((employeeId != null) && (employeeId !=""))
		{
			var teamDataJson = myTeamDataMap[employeeId];
			var employeeName = teamDataJson["employeeName"];
			employeeNameSetter(employeeName);
			var userName = $('<div class="col-sm-6" style="height:40px;"><label class="pull-left" style="margin-top:2%;font-size:14px;font-weight:500;">'+userName+' | ' +employeeName+' </label> </div>');
			   
		}
		else
			{
			employeeName = userName;
			var userName = $('<div class="col-sm-6" style="height:40px;"><label class="pull-left" style="padding-top:12px;padding-left:15px;margin-top:2%;font-family:Nunito Sans;font-size:18px;font-weight:800;cursor:pointer;">'+employeeName+' </label> </div>');
			}
	}
	else{
		if((employeeId != null) && (employeeId !="")){
			var userName = $('<div class="col-sm-6" style="height:40px;"><label class="pull-left" style="margin-top:2%;font-size:14px;font-weight:500;">'+this.userName+' | ' +this.employeeName+' </label> </div>');
		}
		else{
			this.employeeName = this.userName;
			var userName = $('<div class="col-sm-6" style="height:40px;"><label class="pull-left" style="padding-top:12px;padding-left:15px;margin-top:2%;font-family:Nunito Sans;font-size:18px;font-weight:800;cursor:pointer;">'+this.employeeName+' </label> </div>');
		}
		
	}
	
	navigationIndex = null;
	var competencyDiv = $('<div id="competencyDiv" class="container-fluid" style="background:white;padding-left:0px !important;padding-right:0px !important;"></div>');
	
	var fullScore =  $('<div class="col-sm-6" style="height:40px;text-align:right;"></div>');
	var totalScoreLabel = $('<label style="margin-right:2%;font-weight:500;margin-top:0.5%;">Total Score</label>');
	var smallLabelDiv = $('<div class="col-sm-12" style="margin-top:1%;">');
    var span1=$('<span class="pull-right" style="color:#bdbdbd;font-size:10px;margin-right:1%">');
    var span2=$('<span class="pull-right" style="color:#bdbdbd;font-size:10px;margin-right:6%">');
    var span3=$('<span class="pull-right" style="color:#bdbdbd;font-size:10px;margin-right:6%">');
    span1.html("R");
    span2.html("A");
    span3.html("S");
    smallLabelDiv.append(span1);
    smallLabelDiv.append(span2);
    smallLabelDiv.append(span3);
	var phase1Rating = $('<label class="label label-default pull-right" style="color:black;background:white;border-radius:0px;float:left;border:1px solid #d3d5d3;padding:1.5%;width:7%;">').html("0");
	var phase2Rating = $('<label class="label label-default pull-right" style="color:black;background:white;border-radius:0px;float:left;border:1px solid #d3d5d3;padding:1.5%;width:7%;">').html("0");
	var phase3Rating = $('<label class="label label-default pull-right" style="color:black;background:white;border-radius:0px;float:left;border:1px solid #d3d5d3;padding:1.5%;width:7%;">').html("0");
	var dataCompetencyDiv = $('<div id="dataCompetencyDiv" class="col-sm-12" style="margin-bottom:3%;"></div>');

	var fullHeaderDiv = $('<div class="row" style="height:40px;margin-top:2%;background-color: #f9f9f9;padding-top:1%;font-size: 12.5px;"></div>')
	
	var header1 = $('<div class="col-sm-3" style="height: 40px;font-weight:600;">');
    header1.html('<span class="pull-left" style="padding-left:15px">CATEGORIES</span>')
    var label1 = $('<label style="margin-left:3%;"></label>');
    header1.append(label1);
    var header2 = $('<div class="col-sm-3" style="text-align:center;height:40px;border-left:none !important;border-right:none !important;font-weight:600;padding-left:5%;">').html('SELF [S] <span class="dot" style=" background-color: #3BB59E;margin-left: 5px;"></span>');
    var header3 = $('<div class="col-sm-3" style="text-align:center;height:40px;border-left:none !important;border-right:none !important;font-weight:600;padding-left:6%;">').html('APPRAISER [A] <span class="dot" style=" background-color: #84C5EE;margin-left: 5px;"></span>');
    var header4 = $('<div class="col-sm-3" style="text-align:center;height:40px;border-left:none !important;font-weight:600;padding-left:6%;">').html('REVIEWER [R] <span class="dot" style=" background-color: #EDD083;margin-left: 5px;"></span>');
    var competencyBody = prepareBodyForCompetency();
    var phaseScoreArray = competencyCache.getEachPhaseFinalScore();
    var CurrentDate = new Date();
    var userrole = getUserRole();
    var RevApprEndDate = new Date(moment(apprCycle.revApprEndDate).format('DD-MMM-YY'));
    var cycleEndDate = new Date(moment(apprCycle.endate).format('DD-MMM-YY'));
    cycleEndDate.addDays(1);
    if(phaseScoreArray != undefined && phaseScoreArray != null && phaseScoreArray.length > 0){
    	if(phaseScoreArray[0] != null){
    		phase1Rating.html(phaseScoreArray[0].toFixed(2));
    	}
    	if(phaseScoreArray[1] != null)
    	{
    		if((teamMemberId != null||teamMemberId=="")&&(userrole=="Appraiser"||userrole=="Reviewer"))
		    {
		    	phase2Rating.html(phaseScoreArray[1].toFixed(2));  // Appraiser
																	// score to
																	// ESS
		    }
		else if((teamMemberId == null||teamMemberId=="")&&CurrentDate>cycleEndDate)
			{
			    phase2Rating.html(phaseScoreArray[1].toFixed(2));
			}
		else
			{
			phase2Rating.html("-");
			}
    	}
    	if(phaseScoreArray[2] != null)
    	{
            if((teamMemberId != null||teamMemberId=="")&&(userrole=="Appraiser"||userrole=="Reviewer"))
                 {
                     phase3Rating.html(phaseScoreArray[2].toFixed(2));
                 }
                else if(teamMemberId == null&&CurrentDate>cycleEndDate)
                    {
                     phase3Rating.html(phaseScoreArray[2].toFixed(2));
                    }
                else
                    {
                     phase3Rating.html("-");
                    }
        }
    }
    fullHeaderDiv.append(header1);
    fullHeaderDiv.append(header2);
    fullHeaderDiv.append(header3);
    fullHeaderDiv.append(header4);
    dataCompetencyDiv.append(fullHeaderDiv);
    dataCompetencyDiv.append(competencyBody);
    fullScore.append(smallLabelDiv);
    fullScore.append(totalScoreLabel);
    fullScore.append(phase3Rating);
    fullScore.append(phase2Rating);
    fullScore.append(phase1Rating);
    competencyDiv.append(userName);
    competencyDiv.append(fullScore);
    competencyDiv.append(dataCompetencyDiv);
    $('#fullContentDiv').append(competencyDiv);
    $("#showCompetenceLabel").css("font-weight","bold");
    validationsOnSubmit();
    removeSubmitButton(teamDataJson);
    }


/*
 * function showCompetencies(employeeId,roleFromDashboard){ debugger
 * 
 * if(employeeId!=null||employeeId!=undefined){ this.currentEmpId = employeeId; }
 * this.qIdForModal=null; $('#headerOfFullContentDiv').html('');
 * $('#fullContentDiv').html(''); if(this.isDriectorFlag==true){
 * $("#headerOfFullContentDiv").show(); } appendSubmitButtonOnTop();
 * highlightCompetencyLabel(); changeLogoStyleForCompetency();
 * checkSelfFormOrAppraiserForm(employeeId); if(roleFromDashboard != null &&
 * roleFromDashboard != ""){ empRole = roleFromDashboard; }
 * if(typeof(userGeneralInfo)!="undefined"){ var userName =
 * userGeneralInfo["employeeName"]; userNameSetter(userName); if((employeeId !=
 * null) && (employeeId !="")) { var teamDataJson = myTeamDataMap[employeeId];
 * var employeeName = teamDataJson["employeeName"];
 * employeeNameSetter(employeeName); var userName = $('<div class="col-sm-6"
 * style="height:40px;"><label class="pull-left"
 * style="margin-top:2%;font-size:14px;font-weight:500;">'+userName+' | '
 * +employeeName+' </label> </div>'); } else { employeeName = userName; var
 * userName = $('<div class="col-sm-6" style="height:40px;"><label
 * class="pull-left"
 * style="padding-top:12px;padding-left:15px;margin-top:2%;font-family:Nunito
 * Sans;font-size:18px;font-weight:800;cursor:pointer;">'+employeeName+'
 * </label> </div>'); } } else{ if((employeeId != null) && (employeeId !="")){
 * var userName = $('<div class="col-sm-6" style="height:40px;"><label
 * class="pull-left"
 * style="margin-top:2%;font-size:14px;font-weight:500;">'+this.userName+' | '
 * +this.employeeName+' </label> </div>'); } else{ this.employeeName =
 * this.userName; var userName = $('<div class="col-sm-6" style="height:40px;"><label
 * class="pull-left"
 * style="padding-top:12px;padding-left:15px;margin-top:2%;font-family:Nunito
 * Sans;font-size:18px;font-weight:800;cursor:pointer;">'+this.employeeName+'
 * </label> </div>'); } }
 * 
 * navigationIndex = null; var competencyDiv = $('<div id="competencyDiv"
 * class="container-fluid" style="background:white;padding-left:0px
 * !important;padding-right:0px !important;"></div>');
 * 
 * var fullScore = $('<div class="col-sm-6"
 * style="height:40px;text-align:right;"></div>'); var totalScoreLabel = $('<label
 * style="margin-right:2%;font-weight:500;margin-top:0.5%;">Total Score</label>');
 * var smallLabelDiv = $('<div class="col-sm-12" style="margin-top:1%;">'); var
 * span1=$('<span class="pull-right"
 * style="color:#bdbdbd;font-size:10px;margin-right:1%">'); var span2=$('<span
 * class="pull-right" style="color:#bdbdbd;font-size:10px;margin-right:6%">');
 * var span3=$('<span class="pull-right"
 * style="color:#bdbdbd;font-size:10px;margin-right:6%">'); span1.html("R");
 * span2.html("A"); span3.html("S"); smallLabelDiv.append(span1);
 * smallLabelDiv.append(span2); smallLabelDiv.append(span3); var phase1Rating =
 * $('<label class="label label-default pull-right"
 * style="color:black;background:white;border-radius:0px;float:left;border:1px
 * solid #d3d5d3;padding:1.5%;width:7%;">').html("0"); var phase2Rating = $('<label
 * class="label label-default pull-right"
 * style="color:black;background:white;border-radius:0px;float:left;border:1px
 * solid #d3d5d3;padding:1.5%;width:7%;">').html("0"); var phase3Rating = $('<label
 * class="label label-default pull-right"
 * style="color:black;background:white;border-radius:0px;float:left;border:1px
 * solid #d3d5d3;padding:1.5%;width:7%;">').html("0"); var dataCompetencyDiv =
 * $('<div id="dataCompetencyDiv" class="col-sm-12" style="margin-bottom:3%;"></div>');
 * 
 * var fullHeaderDiv = $('<div class="row"
 * style="height:40px;margin-top:2%;background-color:
 * #f9f9f9;padding-top:1%;font-size: 12.5px;"></div>')
 * 
 * var header1 = $('<div class="col-sm-3" style="height:
 * 40px;font-weight:600;">'); header1.html('<span class="pull-left"
 * style="padding-left:15px">CATEGORIES</span>') var label1 = $('<label
 * style="margin-left:3%;"></label>'); header1.append(label1); var header2 =
 * $('<div class="col-sm-3"
 * style="text-align:center;height:40px;border-left:none
 * !important;border-right:none
 * !important;font-weight:600;padding-left:5%;">').html('SELF [S] <span
 * class="dot" style=" background-color: #3BB59E;margin-left: 5px;"></span>');
 * var header3 = $('<div class="col-sm-3"
 * style="text-align:center;height:40px;border-left:none
 * !important;border-right:none
 * !important;font-weight:600;padding-left:6%;">').html('APPRAISER [A] <span
 * class="dot" style=" background-color: #84C5EE;margin-left: 5px;"></span>');
 * var header4 = $('<div class="col-sm-3"
 * style="text-align:center;height:40px;border-left:none
 * !important;font-weight:600;padding-left:6%;">').html('REVIEWER [R] <span
 * class="dot" style=" background-color: #EDD083;margin-left: 5px;"></span>');
 * var competencyBody = prepareBodyForCompetency(); var phaseScoreArray =
 * competencyCache.getEachPhaseFinalScore(); var CurrentDate = new Date(); var
 * userrole = getUserRole(); var RevApprEndDate = new
 * Date(moment(apprCycle.revApprEndDate).format('DD-MMM-YY')); var cycleEndDate =
 * new Date(moment(apprCycle.endate).format('DD-MMM-YY'));
 * cycleEndDate.addDays(1); if(phaseScoreArray != undefined && phaseScoreArray !=
 * null && phaseScoreArray.length > 0){ if(phaseScoreArray[0] != null){
 * phase1Rating.html(phaseScoreArray[0].toFixed(2)); } if(phaseScoreArray[1] !=
 * null) { if((teamMemberId !=
 * null||teamMemberId=="")&&(userrole=="Appraiser"||userrole=="Reviewer")) {
 * phase2Rating.html(phaseScoreArray[1].toFixed(2)); //Appraiser score to ESS }
 * else if((teamMemberId == null||teamMemberId=="")&&CurrentDate>cycleEndDate) {
 * phase2Rating.html(phaseScoreArray[1].toFixed(2)); } else {
 * phase2Rating.html("-"); } } if(phaseScoreArray[2] != null) { if((teamMemberId !=
 * null||teamMemberId=="")&&(userrole=="Appraiser"||userrole=="Reviewer")) {
 * if(getReviewerFinalRating()!=null&&getReviewerFinalRating()!=undefined){ var
 * finalrating = getReviewerFinalRating().finalRating;
 * if(finalrating!=-1&&finalrating!=0){ phase3Rating.html(finalrating); } else{
 * phase3Rating.html(phaseScoreArray[2].toFixed(2)); } } } else if((teamMemberId ==
 * null||teamMemberId=="")&&CurrentDate>cycleEndDate) {
 * if(getReviewerFinalRating()!=null&&getReviewerFinalRating()!=undefined){ var
 * finalrating = getReviewerFinalRating().finalRating;
 * if(finalrating!=-1&&finalrating!=0){ phase3Rating.html(finalrating); } else{
 * phase3Rating.html(phaseScoreArray[2].toFixed(2));; } } } else {
 * phase3Rating.html("-"); } } } fullHeaderDiv.append(header1);
 * fullHeaderDiv.append(header2); fullHeaderDiv.append(header3);
 * fullHeaderDiv.append(header4); dataCompetencyDiv.append(fullHeaderDiv);
 * dataCompetencyDiv.append(competencyBody); fullScore.append(smallLabelDiv);
 * fullScore.append(totalScoreLabel); fullScore.append(phase3Rating);
 * fullScore.append(phase2Rating); fullScore.append(phase1Rating);
 * competencyDiv.append(userName); //competencyDiv.append(title); //
 * competencyDiv.append(teamMemeberName); competencyDiv.append(fullScore);
 * competencyDiv.append(dataCompetencyDiv);
 * $('#fullContentDiv').append(competencyDiv);
 * $("#showCompetenceLabel").css("font-weight","bold"); validationsOnSubmit();
 * removeSubmitButton(teamDataJson); }
 */

function getUserRole(){
	debugger
	var userRole = "";
	if(empRole == null || empRole=="null"){
		userRole = user.role
	}else{
		userRole = empRole;
	}
	return userRole;
}

function getUserId(){
	debugger
	var empId = "";
	if(teamMemberId != null && teamMemberId != ""){
		empId = teamMemberId;
	}else{
		empId = user.apprempid;
	}
	return empId;
}


function checkFiller(section){
	$("#fullContentDiv").ready(function() {
	    var CurrentDate = new Date();
	    var userrole = user.role// getUserRole();
	    var RevApprEndDate = new Date(moment(apprCycle.revApprEndDate).format('DD-MMM-YY'));
	    var cycleEndDate = new Date(moment(apprCycle.endate).format('DD-MMM-YY'));
	    cycleEndDate.addDays(1);
	    var empId = getUserId();
	    var sectionMap =  competencyCache.getSectionAndQuestions();
	    var subMap = sectionMap[section];
	    
	   if(((teamMemberId == null||teamMemberId=="")&&CurrentDate<cycleEndDate)||(teamMemberId == null||teamMemberId=="")&&(userrole=="Appraiser"||userrole=="Reviewer"))
	    { 
		   for(var qId in subMap)
           {
                mngRating = "mngRatingLabel_"+empId+"_"+qId;
                revRating = "revRatingLabel_"+empId+"_"+qId;
               $("#"+mngRating).html("-");
               $("#"+revRating).html("-");
           }   
	    } 
	});

}

function hideDropDownScore(){
	debugger
    var CurrentDate = new Date();
    var userrole = user.role// getUserRole();
    var RevApprEndDate = new Date(moment(apprCycle.revApprEndDate).format('DD-MMM-YY'));
    var cycleEndDate = new Date(moment(apprCycle.endate).format('DD-MMM-YY'));
    cycleEndDate.addDays(1);
    if ((((teamMemberId == null||teamMemberId=="")&&(CurrentDate<cycleEndDate)))||((teamMemberId == null||teamMemberId=="")&&(userrole=="Reviewer")))
    {
    	$("#appr_dropdown").val("0");
        $("#rev_dropdown").val("0");
        $("#appr_remarks").val("");
        $("#rev_remarks").val("");
        
    }
   /*
	 * else if((((teamMemberId != null||teamMemberId!="")&&(CurrentDate<cycleEndDate)))||((teamMemberId !=
	 * null||teamMemberId!="")&&(userrole=="ESS"))) {
	 * $("#appr_dropdown").val("0"); $("#rev_dropdown").val("0");
	 * $("#appr_remarks").val(""); $("#rev_remarks").val(""); }
	 */
   /*
	 * else if((((teamMemberId == null||teamMemberId=="")&&(CurrentDate<cycleEndDate)))||((teamMemberId ==
	 * null||teamMemberId=="")&&(userrole=="Appraiser"||userrole=="Reviewer"))) {
	 * $("#appr_dropdown").val("0"); $("#rev_dropdown").val("0");
	 * $("#appr_remarks").val(""); $("#rev_remarks").val(""); }
	 */    
       
    /* }); */
}


/*
 * function hideDropDownScore() { var CurrentDate = new Date(); var userrole =
 * user.role//getUserRole(); var RevApprEndDate = new
 * Date(moment(apprCycle.revApprEndDate).format('DD-MMM-YY')); var cycleEndDate =
 * new Date(moment(apprCycle.endate).format('DD-MMM-YY'));
 * cycleEndDate.addDays(1); //$("#commentBoxDiv").ready(function() {
 * if((((teamMemberId ==
 * null||teamMemberId=="")&&(CurrentDate>cycleEndDate)))||((teamMemberId ==
 * null||teamMemberId=="")&&(userrole=="Appraiser"||userrole=="Reviewer"))) {
 * 
 * $("#appr_dropdown").val("0"); $("#rev_dropdown").val("0");
 * $("#appr_remarks").val(""); $("#rev_remarks").val(""); }
 * 
 * //}); }
 */

function checkSelfFormOrAppraiserForm(employeeId){
	debugger
	$("#fullContentDiv").show();
	var userRole = getUserRole();
	if(employeeId != "" && teamMemberId == null){
		// competencyCache.dataStorageMap = null;
		competencyCache.emptyAllExistedValue();
		teamMemberId = employeeId;
	} 
	if(teamMemberId != null && teamMemberId != "" && employeeId != teamMemberId){
		competencyCache.emptyAllExistedValue();
		teamMemberId = employeeId;
	}
	if(employeeId == "" && (userRole == "Appraiser" || userRole == "Reviewer")){
		teamMemberId = null;
		competencyCache.emptyAllExistedValue();
	}else{
		teamMemberId = employeeId;
	}
}

function getQuestionPerSection(section){
	
	var sectionMap =  competencyCache.getSectionAndQuestions();
	var subMap = sectionMap[section];
	return Object.keys(subMap).length;
}


function getQuestionAnsweredPerSection(section){
	debugger
		var countAsSave = 0;
	    var countAsSaveAsDraft=0
		var answeredSectionMap = competencyCache.questionSectionStorageMap ;
		if(answeredSectionMap != undefined && answeredSectionMap != null && answeredSectionMap.size >0){
			var mapIter = answeredSectionMap.values();
			for(var i=0;i<answeredSectionMap.size ;i++)
			{
			  if(mapIter.next().value == section)
				  countAsSave=countAsSave+1;
			}
		}
		if(currentPhase==1)
			for(var i=0;i< Object.values(competencyCache.sectionMap[section]).length ;i++)
			{
			 if(Object.values(competencyCache.sectionMap[section])[i][1] != null)
				 countAsSaveAsDraft=countAsSaveAsDraft+1;
			}
		if(currentPhase==2){
			for(var i=0;i< Object.values(competencyCache.sectionMap[section]).length ;i++)
			{
			
			 if(Object.values(competencyCache.sectionMap[section])[i][2] != null && currentPhase==2 )
				 countAsSaveAsDraft=countAsSaveAsDraft+1;
			}
		}
		if(currentPhase==3){
			for(var i=0;i< Object.values(competencyCache.sectionMap[section]).length ;i++)
			{
			if(Object.values(competencyCache.sectionMap[section])[i][3] != null)
				 countAsSaveAsDraft=countAsSaveAsDraft+1;
			}			
		}
	if(countAsSaveAsDraft>countAsSave)
	 return (countAsSaveAsDraft);	
	else
		return countAsSave;
	}

function setNewPhaseId(currentPhase){
	this.newPhaseId = currentPhase; 
	}

function prepareBodyForCompetency(){
	debugger
	var bodyContainer = $('<div class="col-sm-12" id="competencyBodyDiv" style="padding-left:0px !important;padding-right:0px !important;">');
    var finalScoreMap = competencyCache.getFinalScoreMap();
    setNewPhaseId(currentPhase);
    var status = getStatusOfTeamMember();
    if(finalScoreMap != undefined && finalScoreMap != null && !jQuery.isEmptyObject(finalScoreMap)){
    	for(var section in finalScoreMap){
    		if(section != "Overview"){
    			var count2=getQuestionPerSection(section);
    			var count1= getQuestionAnsweredPerSection(section);
    			var nameOfCompetency = $('<div class="col-sm-3" style="height: 40px;padding:0px 0px 0px 0px;font-weight:500;">');
    			var status = getStatusOfTeamMember();
    			if(status=="Completed"){
    		       	var countOfAnsweredQuestionPerSection = $('<label id="countOfAnsweredQuestionPerSection" class="col-sm-6" style="cursor:pointer;margin-left:65%;margin-top:-10%;font-weight:500;padding-right: 130px;z-index:999999"><img class="pull-right" src="images/Edit.svg" onclick="renderCompetencyQuestions(\''+ section +'\')" style="cursor:pointer;">'+'</label>');
    	
    		     	$("#saveAndContinueBtn").prop('disabled', false);
    		        $("#saveAndContinueBtn").css("cursor","pointer");
    			}
    		   	else{
    		       	var countOfAnsweredQuestionPerSection = $('<label id="countOfAnsweredQuestionPerSection" class="col-sm-12" style="cursor:pointer;margin-left:65%;margin-top:-10%;font-weight:500;padding-right: 130px;z-index:999999">'+count1+'/'+count2+'<img class="pull-right" src="images/Edit.svg" onclick="renderCompetencyQuestions(\''+ section +'\')" style="cursor:pointer;">'+'</label>');
    		       	$("#saveAndContinueBtn").prop('disabled', false);
    		        $("#saveAndContinueBtn").css("cursor","pointer");
    		   	}
    			var label1 = $('<label class="col-sm-12" style="cursor:pointer;padding:0px 0px 0px 0px;margin-top:3%;font-weight:500;" onclick="renderCompetencyQuestions(\''+ section +'\')">'+'<span class="pull-left" style="color:#3A97D3;padding-left:15px">'+section+'</span>'+'</label>');
    			nameOfCompetency.append(label1);
    			nameOfCompetency.append(countOfAnsweredQuestionPerSection);
    			var ratingContainer = finalScoreMap[section];
    			var employeeRating = $('<div class="col-sm-3" style="text-align:center;height: 40px;padding-top:1%;font-weight:500;padding-left:5%;padding-right:30px">');
    			var managerRating = $('<div class="col-sm-3" style="text-align:center;height: 40px;padding-top:1%;font-weight:500;padding-left:6%;padding-right:30px">');
    			var reviwerRating = $('<div class="col-sm-3" style="text-align:center;height: 40px;padding-top:1%;font-weight:500;padding-left:6%;padding-right:30px">');
    			var CurrentDate = new Date();
    			var userrole = getUserRole();
    			var RevApprEndDate = new Date(moment(apprCycle.revApprEndDate).format('DD-MMM-YY'));
    			var cycleEndDate = new Date(moment(apprCycle.endate).format('DD-MMM-YY'));
    			cycleEndDate.addDays(1);
    			if(ratingContainer != null && !jQuery.isEmptyObject(ratingContainer))
    			{
    				employeeRating.html(ratingContainer["e"].toFixed(2));
    				if(((teamMemberId == null||teamMemberId=="")&&CurrentDate>cycleEndDate)||((teamMemberId != null)&&(userrole=="Appraiser"||userrole=="Reviewer")))
    			    {
        				managerRating.html(ratingContainer["m"].toFixed(2));
        				reviwerRating.html(ratingContainer["r"].toFixed(2));
    			    }
    				else
    					{
        				managerRating.html("-");
        				reviwerRating.html("-");
    					}
    				
    			}
    			else
    			{
    				employeeRating.html("-");
    				managerRating.html("-");
    				reviwerRating.html("-");
    			}
    			bodyContainer.append(nameOfCompetency);
    			bodyContainer.append(employeeRating);
    			bodyContainer.append(managerRating);
    			bodyContainer.append(reviwerRating);
    		}
    	}
    }else{
    	var errorDiv = $('<div class="col-sm-12" id="errorDiv">').html("No data available");
    	bodyContainer.append(errorDiv);
    }
    return bodyContainer;
}

function renderCompetencyQuestions(section){
	debugger
	this.qIdForModal=null;
	$('#fullContentDiv').html('');
	navigationIndex = null;
	var competencyDiv = $('<div id="competencyQuestionsDiv" class="col-sm-12" style="border:1px solid #ffffff;background:white;padding-left:0px !important;padding-right:0px !important;overflow-y: auto;max-height:400px;"></div>');
	var leftHeaderDiv = $('<div class="col-sm-7" style="float:left;padding-top:1%;padding-bottom:1%;">');
	var empId = "";
	if(teamMemberId != null && teamMemberId != ""){
		empId = teamMemberId;
	}
	var titleLable = $('<img src="images/back arrow.png" onclick ="showCompetencies(\''+empId+'\',\''+empRole+'\')" style="margin-left:15px;cursor:pointer;width:20px;margin-right:10px;"><label onclick ="showCompetencies(\''+empId+'\',\''+empRole+'\')" style="color:#3A97D3;font-family:Nunito Sans;font-size:15px;font-weight:600;cursor:pointer;width:40%;padding-left:0%;">'+section+'</label>');
	var rightHeaderDiv = $('<div class="col-sm-5 pull-right" style="padding-right:6.5%;padding-top:0%;">');
	var smallLabelDiv = $('<div class="col-sm-12" style="margin-top:0%;">');
    var span1=$('<span class="pull-right" style="color:#3BB59E;font-size:12px;margin-right:1%">');
    var span2=$('<span class="pull-right" style="color:#84C5EE;font-size:12px;margin-right:7%">');
    var span3=$('<span class="pull-right" style="color:#EDD083;font-size:12px;margin-right:9%">');
    span1.html('R');
    span2.html('A');
    span3.html('S');
    smallLabelDiv.append(span1);
    smallLabelDiv.append(span2);
    smallLabelDiv.append(span3);
	var selfRatingLabel = $('<label id="totalEmpScoreLabel" class="label label-default pull-right" style="color:black;background:white;border-radius:0px;height:25px;float:left;border:1px solid #d3d5d3;padding-top:1.5%;width:9%;">');
    var managerRatingLabel = $('<label id="totalManScoreLabel" class="label label-default pull-right" style="color:black;background:white;border-radius:0px;height:25px;float:left;border:1px solid #d3d5d3;padding-top:1.5%;width:9%;">');
    var reviewerRatingLabel = $('<label id="totalRevScoreLabel" class="label label-default pull-right" style="color:black;background:white;border-radius:0px;height:25px;float:left;border:1px solid #d3d5d3;padding-top:1.5%;width:9%;">');
    var headerdiv = $('<div class="col-sm-12" style="background:#F9F9F9;height:40px;">');
    var leftLabel = $('<label class="pull-left" style="color:#4A4A4A;font-family:Nunito Sans;font-size:12.5px;font-weight:800;margin-left:0%;margin-top:1%;padding-left:15px">').html("INDICATORS");
    var rightLabel = $('<label class="pull-right" style="color:#4A4A4A;font-family:Nunito Sans;font-size:12.5px;font-weight:800;margin-right:9%;margin-top:1%;">').html("");
    var bodyContainer = prepareBodyForQuestions(section);
    leftHeaderDiv.append(titleLable);
    rightHeaderDiv.append(smallLabelDiv);
    rightHeaderDiv.append(reviewerRatingLabel);
    rightHeaderDiv.append(managerRatingLabel);
    rightHeaderDiv.append(selfRatingLabel);
    headerdiv.append(leftLabel);
    headerdiv.append(rightLabel);
    competencyDiv.append(leftHeaderDiv);
    competencyDiv.append(rightHeaderDiv);
    competencyDiv.append(headerdiv);
    competencyDiv.append(bodyContainer);
    $('#fullContentDiv').append(competencyDiv);
    fillTotalScore(section);
    checkFiller(section);
  
    var bodyContainer = prepareBodyForQuestions(section);
}


function fillTotalScore(section){
	debugger
	var finalScoreMap = competencyCache.getFinalScoreMap();
	var ratingContainer = finalScoreMap[section];
	var RevApprEndDate = new Date(moment(apprCycle.revApprEndDate).format('DD-MMM-YY'));
	var cycleEndDate = new Date(moment(apprCycle.endate).format('DD-MMM-YY'));
	cycleEndDate.addDays(1);
    var userrole = getUserRole();
    var CurrentDate = new Date();
	if(ratingContainer != undefined && ratingContainer != null && !jQuery.isEmptyObject(ratingContainer))
	{
		$('#totalEmpScoreLabel').html(ratingContainer["e"].toFixed(2));
		  if((teamMemberId == null&&CurrentDate>cycleEndDate)||(teamMemberId != null)&&(userrole=="Appraiser"||userrole=="Reviewer"))
			  {
			     $('#totalManScoreLabel').html(ratingContainer["m"].toFixed(2));
			  }
		  else
			  {
			      $('#totalManScoreLabel').html("-");
			  }
		  
		   if((teamMemberId == null&&CurrentDate>cycleEndDate)||(teamMemberId != null)&&(userrole=="Appraiser"||userrole=="Reviewer"))
			  {
			    $('#totalRevScoreLabel').html(ratingContainer["r"].toFixed(2)); 
			  }
		  else
			  {
			      $('#totalRevScoreLabel').html("-");
			  }
   }
}

function appendSubmitButtonOnTop(){
	debugger
	$('#headerOfFullContentDiv').html('');
	var leftDiv = $('<div class="col-sm-6" style="background:#FFFFFF;padding-bottom:11px;padding-top:20px;">');
	var empId = ""; 
	if(teamMemberId != null && teamMemberId != ""){
		empId = teamMemberId;
	}
	var label = $('<label id="showInformationLabel" style="padding-left:15px;font-weight:100;font-size:22px;cursor:pointer;font-family:Nunito Sans;color: #4A4A4A;" onclick="showInformation()">Information</label><label id="showCompetenceLabel" style="font-weight:bold;font-size:22px;margin-left:8%;cursor:pointer;font-family:Nunito Sans;color: #4A4A4A;" onclick="showCompetencies(\''+empId+'\')"> Competencies</label>');
	$("#showCompetenceLabel").css("font-weight","bold");
	var rightDiv = $('<div class="col-sm-6" style="background:#FFFFFF;padding-bottom:16px;padding-top:16px;">');
	var submitButton = $('<button id="submitCompetenciesBtn" class="btn btn-outline-blue btn-success pull-right" style="margin-right:2%;border-radius:0px !important;padding: 8px 25px;padding-bottom: 8px;" onclick="submitCompetencies()">Submit</button>');
	var saveAsButton = $('<button id="saveCompetenciesBtn" class="btn btn-outline-blue btn-success pull-right" style="margin-right:2%;border-radius:0px !important;padding: 8px 25px;padding-bottom: 8px;" onclick="saveAsDraft()">Save as draft</button>');
	leftDiv.append(label);
	rightDiv.append(submitButton);
	rightDiv.append(saveAsButton);
	$('#headerOfFullContentDiv').append(leftDiv);
	$('#headerOfFullContentDiv').append(rightDiv);
}

function highlightCompetencyLabel(){
	$('#showCompetenceLabel').css({"border-bottom":"2.5px solid #3A97D3","font-weight":"500","font-size":"22px"});
	$('#showInformationLabel').css({"text-decoration":"none","font-weight":"100","font-size":"22px"});
}

function highlightInformationLabel(){
	$('#showInformationLabel').css({"border-bottom":"2.5px solid #3A97D3","font-weight":"500","font-size":"22px"});
	$('#showCompetenceLabel').css({"text-decoration":"none","font-weight":"100","font-size":"22px"});
}



function prepareBodyForQuestions(section){
	debugger
	competencyCache.sequentialQuestionsMap = {};
	var bodyContainer = $('<div class="col-sm-12" style="padding-left:0%;padding-right:4%;">');
	var sectionMap =  competencyCache.getSectionAndQuestions();
	var questionIdMap = competencyCache.getQuestionFromId();
	var empId = getUserId();
	var userrole = getUserRole();
	if(sectionMap != undefined && sectionMap != null && !jQuery.isEmptyObject(sectionMap)){
			var subMap = sectionMap[section];
			var sequenceMap = competencyCache.sequentialQuestionsMap;
			var counter = 1;
			totalScoreContainer = [];
			var totalEmpScore = 0;
			var totalMngScore = 0;
			var totalRevScore = 0;
			for(var qId in subMap){
				var empRemarks = "";
				var mngRemarks = "";
			    var revRemarks = "";
			    var empRating = 0;
			    var mngRating = 0;
			    var revRating = 0;
			    var isRatingEnable="";
			    var question = questionIdMap[qId];
				var storageUnit = competencyCache.dataStorageMap;
				if(storageUnit != undefined && storageUnit != null && storageUnit.size > 0){
					var returnValueArray = checkAndFillValuesInElements(qId,empId);
					if(currentPhase == "1"){
						empRemarks = returnValueArray[0];
						empRating = parseInt(returnValueArray[1]);
					}else if(currentPhase == "2"){
						empRemarks = returnValueArray[0];
						empRating = parseInt(returnValueArray[1]);
						mngRemarks = returnValueArray[2];
						if(returnValueArray[3] != ""){
							mngRating = parseInt(returnValueArray[3]);
						}else{
							mngRating = 0;
						}
					}else if(currentPhase == "3"){
						empRemarks = returnValueArray[0];
						empRating = parseInt(returnValueArray[1]);
						mngRemarks = returnValueArray[2];
						mngRating = parseInt(returnValueArray[3]);
						revRemarks = returnValueArray[4]
						if(returnValueArray[5] != ""){
							revRating = parseInt(returnValueArray[5]);
						}else{
							revRating = 0;
						}
					}
				}else{
					var dataArray = subMap[qId];
					if(dataArray != undefined && dataArray != "" && dataArray.length > 0){
						empRemarks = dataArray["1"];
						mngRemarks = dataArray["2"];
						revRemarks = dataArray["3"];
						empRating =  dataArray["4"];
						mngRating =  dataArray["5"];
						revRating =  dataArray["6"];
						isRatingEnable = dataArray["7"];
					}	
				}
				totalEmpScore += empRating;
				totalMngScore += mngRating;
				totalRevScore += revRating;
				sequenceMap[qId] = counter;
			   var contentDiv = $('<div class="col-sm-12" style="padding-left:0px">');
			    var smallLabelDiv = $('<div class="col-sm-12" style="margin-top:1%;">');
			    var span1=$('<span class="pull-right" style="color:#EDD083;font-size:12px;margin-right:1.5%">');
			    var span2=$('<span class="pull-right" style="color:#84C5EE;font-size:12px;margin-right:3%">');
			    var span3=$('<span class="pull-right" style="color:#3BB59E;font-size:12px;margin-right:3%">');
			    span1.html("R");
			    span2.html("A");
			    span3.html("S");
			  
			    contentDiv.append(smallLabelDiv);
			  
				
				var leftContent = $('<div class="col-sm-10"><label data-target="#" onclick="openModalBox(\''+qId+'\',\''+empId+'\',\''+section+'\',\''+question+'\',\''+isRatingEnable+'\')" style="color:#3A97D3;padding-left:15px;font-family:Nunito Sans;font-size:14px;font-weight:600;cursor:pointer;width:100%;">'+question+'</label></div>');
			    var rightContent = $('<div class="col-sm-2 pull-right">');
			    var selfRatingLabel = $('<label id="empRatingLabel_'+empId+"_"+qId+'" class="label label-default pull-right" style="color:black;background:white;border-radius:0px;height:25px;float:left;border:1px solid #d3d5d3;padding-top:5%;width:25%;">').html("0");
			    var managerRatingLabel = $('<label  id="mngRatingLabel_'+empId+"_"+qId+'" class="label label-default pull-right" style="color:black;background:white;border-radius:0px;height:25px;float:left;border:1px solid #d3d5d3;padding-top:5%;width:25%;">').html("0");
			    var reviewerRatingLabel = $('<label  id="revRatingLabel_'+empId+"_"+qId+'" class="label label-default pull-right" style="color:black;background:white;border-radius:0px;height:25px;float:left;border:1px solid #d3d5d3;padding-top:5%;width:25%;">').html("0");
			    var selfRemarkLabel = $('<div class="col-sm-12" id="questionRemarkLabel_'+empId+"_"+qId+'" disabled="disabled" style="width:96%;>').html(empRemarks);
		    	if(empRating == "" || empRating == undefined){
		    		selfRatingLabel.html("0");
		    	}else{
		    		selfRatingLabel.html(empRating);
		    	}
		    	if(mngRating == "" || mngRating == undefined){
		    		managerRatingLabel.html("0");
		    	}else{
		    		managerRatingLabel.html(mngRating);
		    	}
		    	if(revRating == "" || revRating == undefined){
		    		reviewerRatingLabel.html("0");
		    	}else{
		    		reviewerRatingLabel.html(revRating);
		    	}
		    	if(userrole == "Appraiser" && teamMemberId != null){
		    		selfRemarkLabel.html(mngRemarks);
		    	}
		    	if(userrole == "Reviewer" && teamMemberId != null){
		    		selfRemarkLabel.html(revRemarks);
		    	}
			    
			    contentDiv.append(leftContent);
			    contentDiv.append(rightContent);
			    contentDiv.append(selfRemarkLabel);
			    bodyContainer.append(contentDiv);
			    counter++;
			}
			 firstAndLastQuestion()
			 totalScoreContainer.push(totalEmpScore);
			 totalScoreContainer.push(totalMngScore);
			 totalScoreContainer.push(totalRevScore);
			 competencyCache.sequentialQuestionsMap = sequenceMap;
	}
	return bodyContainer; 
}

function appendButtonTOLastQuestioPersection(qId){
	debugger
	spanDivForButton=$("#divForSaveAndContinue");
	if(lastQuestion.includes(qId)){
		$("#divForSaveAndContinue").show()
	}
	else{
		spanDivForButton.hide();
	}
}

function checkValidationOnFirstQuestion(qId){
	return(!firstQuestion.includes(qId))
}

function firstAndLastQuestion(){
	debugger
	 var sectionMap = competencyCache.getSectionAndQuestions();
	 var lengthOfSectionMap = Object.keys(sectionMap).length;
	 for(var i=0; i<lengthOfSectionMap; i++){
		var map= Object.keys(sectionMap[Object.keys(sectionMap)[i]])
		    this.firstQuestion.push(map[0]);
		    this.lastQuestion.push(map[map.length-1]);
	 }
}

function alignModalBox(){
	debugger
	var bodyWidth = $(window).outerWidth();
	var bodyHeight = $(window).height();
	var widthPercentage = (bodyWidth * 10) / 100;
	var heightPercentage = (bodyHeight * 5) / 100;
	$('#remarksAndScoreBox').css({'left': widthPercentage+'px !important','top':heightPercentage+'px !important'});
	$('#remarksAndScoreBox').modal('show');
}

function raterSetup(){
	debugger
	$(".rate-select-layer").css("width","20%");
	$(".rate-hover-layer").css("width","20%");
	$("#emp_dropdown").attr("disabled","true");
	$("#emp_dropdown").val('');
	$("#appr_dropdown").attr("disabled","true");
	$("#appr_dropdown").val('');
	$("#rev_dropdown").attr("disabled","true");
	$("#rev_dropdown").val('');
	$("#emp_dropdown").hide();
	$("#appr_dropdown").hide();
	$("#rev_dropdown").hide();
}

function starTwoWayDataBinding() {
	debugger
    var empVal= $("#emp_dropdown").val();
    var apprVal = $("#appr_dropdown").val();
    var revVal = $("#rev_dropdown").val();

    $($(".rateemp").children()[1]).css("width",empVal*20+"%");
    $($(".rateappr").children()[1]).css("width",apprVal*20+"%");
    $($(".raterev").children()[1]).css("width",revVal*20+"%");
}

function openModalBox(qId,empId,section,question,isRatingEnable,questionTitle){
	debugger
	appendButtonTOLastQuestioPersection(qId);
	saveAndContinue1(qId,empId,section,question,isRatingEnable,questionTitle);

	raterSetup();
	var countOfAnsweredQuestion = 0;
	alignModalBox();
	enableAllFields();
	var isInformation = false;  // Whether its a competence/information.
	if(questionTitle != undefined && questionTitle != null && questionTitle != ""){
		changeBoxAccordingInformation(questionTitle,question);
		isInformation = true;
		$('#sectionLabel').html(section);
		$("#infoImg").hide()
		$("#crossImg").attr("onclick","$('#remarksAndScoreBox').modal('hide');");
		questionForInformationPerSectionSlider(qId,empId,section,question,null,questionTitle);
	}else{
		$("#infoImg").show()
		$("#crossImg").attr("onclick","$('#remarksAndScoreBox').modal('hide');");
		changeBoxAccordingCompetence();
		if(question.length > 30){
			$('#sectionLabel').html(section.substr(0,30)+"...");
		}else{
			$('#sectionLabel').html(section);
			
		}
		questionPerSectionSlider(qId,empId,section,question,isRatingEnable,questionTitle);
	}
	
	emptyAllValueInModalBox(); 
	fillScoreBox();  
	checkAndFillValuesInElements(qId,empId);
	qIdForModal = qId;
	empIdForModal = empId;
	sectionForModal = section;
	$("#sectionLabel").css("font-size","large")
	$("#saveAndContinueBtn").on("click",
			function(){saveAndContinue1(qId,empId,section,question,isRatingEnable,questionTitle);
			});
	hideAndShowPI(isInformation);
	setPerformnaceIndicators(qId);
	hideDropDownScore();
	starTwoWayDataBinding();
	setValidations();
}

	
function saveAndContinue1(qId,empId,section,question,isRatingEnable,questionTitle){
	debugger
	 var status = getStatusOfTeamMember(empId);
	if(validationNumber != null){
		var allValidationsVerified = checkCredibiltyOfValidationsOnModalBox(validationNumber); 
		if(allValidationsVerified){
			
			var storageUnit = competencyCache.getDataStorageMap();	
			var sectionStorage = competencyCache.getSectionDataStorageMap();
			
			if(currentPhase == "1"){
					var dualValueArray = [];
					var empRemarks =  $('#emp_remarks').val();
					var empScore = $('#emp_dropdown').val();
					if(sectionForModal=="Overview"){
							if((empRemarks != "")||((empScore != "")&&(empScore != 0))&&((qIdForModal != null)))
						{ 
							dualValueArray.push(empRemarks);
							dualValueArray.push(empScore);
							
						}
						}
					else{
						if((empRemarks != "")|| ((empScore != "")&&(empScore != 0)) && (qIdForModal != null))
					{ 
						dualValueArray.push(empRemarks);
						dualValueArray.push(empScore);
					}
				}
						if((dualValueArray.length!=0)&&(qIdForModal != null)){
						sectionStorage.set(qIdForModal,sectionForModal);
						competencyCache.questionSectionStorageMap =sectionStorage;
					    storageUnit.set(empIdForModal+"_"+qIdForModal,dualValueArray);
					    competencyCache.dataStorageMap = storageUnit;
					}
					if(empScore == undefined || empScore == null || empScore == ""){
						$("#empRatingLabel_"+empIdForModal+"_"+qIdForModal).html("0");
					}else{
						$("#empRatingLabel_"+empIdForModal+"_"+qIdForModal).html(empScore);
					}
					$("#questionRemarkLabel_"+empIdForModal+"_"+qIdForModal).html(empRemarks);
				}
			
				if(currentPhase == "2"){
					var dualValueArray = [];
					var apprRemarks =  $('#appr_remarks').val();
					var apprScore = $('#appr_dropdown').val();
					if(sectionForModal=="Overview"){
						if((apprRemarks != "")||(apprScore != "")&& (qIdForModal != null))
						{ 
							dualValueArray.push(apprRemarks);
							dualValueArray.push(apprScore);
						}
						}
					else{
							if((apprRemarks != "")||((apprScore != "")&&(apprScore != 0))&&(qIdForModal != null))
					{ 
						dualValueArray.push(apprRemarks);
						dualValueArray.push(apprScore);
					}
					}
						if((dualValueArray.length!=0)&& (qIdForModal != null)){
						sectionStorage.set(qIdForModal,sectionForModal);
						competencyCache.questionSectionStorageMap =sectionStorage;
					    storageUnit.set(empIdForModal+"_"+qIdForModal,dualValueArray);
					    competencyCache.dataStorageMap = storageUnit;
					}
				if(apprScore == undefined || apprScore == null || apprScore == ""){
						$("#mngRatingLabel_"+empIdForModal+"_"+qIdForModal).html("0");
					}else{
						$("#mngRatingLabel_"+empIdForModal+"_"+qIdForModal).html(apprScore);
					}
					var questionRatingStatusMap = competencyCache.getMapOfQuestionIsRatedOrNot();
					var questionRatingStatus = questionRatingStatusMap[qIdForModal];
					if(questionRatingStatus == "N"){
						$('#appr_questionRemarkLabel_'+empIdForModal+"_"+qIdForModal).html(apprRemarks);
					}else{
						$("#questionRemarkLabel_"+empIdForModal+"_"+qIdForModal).html(apprRemarks);
					}
				}
				
				if(currentPhase == "3" && status==""){
					var dualValueArray = [];
					var apprRemarks =  $('#appr_remarks').val();
					var apprScore = $('#appr_dropdown').val();
					if(sectionForModal=="Overview"){
						if((apprRemarks != "")||(apprScore != "")&& (qIdForModal != null))
						{ 
							dualValueArray.push(apprRemarks);
							dualValueArray.push(apprScore);
						}
						}
					else{
							if((apprRemarks != "")||((apprScore != "")&&(apprScore != 0))&&(qIdForModal != null))
					{ 
						dualValueArray.push(apprRemarks);
						dualValueArray.push(apprScore);
					}
					}
						if((dualValueArray.length!=0)&& (qIdForModal != null)){
						sectionStorage.set(qIdForModal,sectionForModal);
						competencyCache.questionSectionStorageMap =sectionStorage;
					    storageUnit.set(empIdForModal+"_"+qIdForModal,dualValueArray);
					    competencyCache.dataStorageMap = storageUnit;
					}
				if(apprScore == undefined || apprScore == null || apprScore == ""){
						$("#mngRatingLabel_"+empIdForModal+"_"+qIdForModal).html("0");
					}else{
						$("#mngRatingLabel_"+empIdForModal+"_"+qIdForModal).html(apprScore);
					}
					var questionRatingStatusMap = competencyCache.getMapOfQuestionIsRatedOrNot();
					var questionRatingStatus = questionRatingStatusMap[qIdForModal];
					if(questionRatingStatus == "N"){
						$('#appr_questionRemarkLabel_'+empIdForModal+"_"+qIdForModal).html(apprRemarks);
					}else{
						$("#questionRemarkLabel_"+empIdForModal+"_"+qIdForModal).html(apprRemarks);
					}
				}
				if(currentPhase == "3" && status=="Completed"){
				var dualValueArray = [];
				var revRemarks =  $('#rev_remarks').val();
				var revScore = $('#rev_dropdown').val();
				if(sectionForModal=="Overview"){
					var revRemarks =  $('#rev_remarks').val();
					if((revRemarks != "")||(revScore != "")&& ((qIdForModal != null)))
					{ 
						dualValueArray.push(revRemarks);
						dualValueArray.push(revScore);
					}
					}
				else{
					if((revRemarks != "") || ((revScore != "")&&(revScore != 0))&&(qIdForModal != null))
				{ 
					dualValueArray.push(revRemarks);
					dualValueArray.push(revScore);
				}
				}
					if((dualValueArray.length!=0)&& (qIdForModal != null)){
					sectionStorage.set(qIdForModal,sectionForModal);
					competencyCache.questionSectionStorageMap =sectionStorage;
				    storageUnit.set(empIdForModal+"_"+qIdForModal,dualValueArray);
				    competencyCache.dataStorageMap = storageUnit;
				}
				if(revScore == undefined || revScore == null || revScore == ""){
					$("#revRatingLabel_"+empIdForModal+"_"+qIdForModal).html("0");
				}else{
					$("#revRatingLabel_"+empIdForModal+"_"+qIdForModal).html(revScore);
				}
				$("#questionRemarkLabel_"+empIdForModal+"_"+qIdForModal).html(revRemarks);
			}
			
				if(currentPhase == "3" && status!=""){
					var dualValueArray = [];
					var revRemarks =  $('#rev_remarks').val();
					var revScore = $('#rev_dropdown').val();
					if(sectionForModal=="Overview"){
						var revRemarks =  $('#rev_remarks').val();
						if((revRemarks != "")||(revScore != "")&& ((qIdForModal != null)))
						{ 
							dualValueArray.push(revRemarks);
							dualValueArray.push(revScore);
						}
						}
					else{
						if((revRemarks != "") || ((revScore != "")&&(revScore != 0))&&(qIdForModal != null))
					{ 
						dualValueArray.push(revRemarks);
						dualValueArray.push(revScore);
					}
					}
						if((dualValueArray.length!=0)&& (qIdForModal != null)){
						sectionStorage.set(qIdForModal,sectionForModal);
						competencyCache.questionSectionStorageMap =sectionStorage;
					    storageUnit.set(empIdForModal+"_"+qIdForModal,dualValueArray);
					    competencyCache.dataStorageMap = storageUnit;
					}
					if(revScore == undefined || revScore == null || revScore == ""){
						$("#revRatingLabel_"+empIdForModal+"_"+qIdForModal).html("0");
					}else{
						$("#revRatingLabel_"+empIdForModal+"_"+qIdForModal).html(revScore);
					}
					$("#questionRemarkLabel_"+empIdForModal+"_"+qIdForModal).html(revRemarks);
				}
						
		}else{
			showToster('Warning !', "Form has been tempered.", 5, "warning");
		}
	}
// showCompetencies('','null');
 var sectionMap = competencyCache.getSectionAndQuestions();
 var strOverview = Object.keys(sectionMap.Overview);
 if(booleanForToster == true){
 if((strOverview.includes(qIdForModal))||(strOverview.includes(qId)))
 {    
	 if(checkValidationOnFirstQuestion(qId)){
		 if(currentPhase==1){
			 if($("#emp_remarks").val()==null||$("#emp_remarks").val()==""){ 
				 showToster('Warning !', "Please fill valid remark", 5, "warning");
			 }
			 else{
				 showToster('Success !', " Saved !", 2, "success");
			 }
		 }
		 else if(currentPhase==2){
			 if($("#emp_remarks").val()==null||$("#appr_remarks").val()==""){
				 showToster('Warning !', "Please fill valid remark", 5, "warning");
			 }
			 else{
				 showToster('Success !', " Saved !", 2, "success");
			 }
		 }
	 }	

 }
 
 else{
	 if(checkValidationOnFirstQuestion(qId)){
		   	onEmpScoreDropdown();
		   }
}
 }
}
		

		
function onEmpScoreDropdown()
{
	debugger
    var flag ;
    if(currentPhase=="1")
    {
            if(($("#emp_dropdown").val()==null||$("#emp_dropdown").val()=="")||$("#emp_dropdown").val()==0||($("#emp_remarks").val()==null||$("#emp_remarks").val()==""))
            {
        	  flag = false;
            }
            else
            {
              flag = true;
            }
    }
    else if(currentPhase=="2")
    {
        	 if(($("#appr_dropdown").val()==null||$("#appr_dropdown").val()=="")||$("#appr_dropdown").val()==0||($("#appr_remarks").val()==null||$("#appr_remarks").val()==""))
             {
         	  flag = false;
             }
        	 else
        	{
        	  flag = true;
        	}	  
    }
    else if(currentPhase=="3")
    {
        	 if(($("#rev_dropdown").val()==null||$("#rev_dropdown").val()=="")||$("#rev_dropdown").val()==0||($("#rev_remarks").val()==null||$("#rev_remarks").val()==""))
             {
         	  flag = false;
             }
        	 else
        	{
        	  flag = true;
        	}       
    }
   if(flag == false)
	   {
	   showToster('Warning !', "Please choose the valid score and fill the remark", 5, "warning");
	   }
   else{
	   showToster('Success !', " Saved !", 2, "success");
   }
}
function hideAndShowPI(isInformation){
	debugger	
	if(isInformation){
		viewFlag = true;
		viewAndHidePI();
	}else{
		viewFlag = false;
		viewAndHidePI();
	}
}

function saveAndViewMultipleRemarks(){
	debugger
	var storageUnit = competencyCache.getDataStorageMap();
	var questionRatingStatus = competencyCache.getMapOfQuestionIsRatedOrNot();
	if(storageUnit.size > 0){
		for(var conjuctionKey of storageUnit.keys()){
			var empId = conjuctionKey.split("_")[0];
			var qId = conjuctionKey.split("_")[1];
			var dataArray = storageUnit.get(conjuctionKey);
			var remarks = dataArray[0];
			var score =  dataArray[1];
			var isRatingYOrN = questionRatingStatus[qId];
			if(currentPhase == "1"){
				if(score == undefined || score == null || score == ""){
					$("#empRatingLabel_"+empId+"_"+qId).html("0");
				}else{
					$("#empRatingLabel_"+empId+"_"+qId).html(score);
				}
				$("#questionRemarkLabel_"+empId+"_"+qId).html(remarks);
			}
			if(currentPhase == "2"){
				if(score == undefined || score == null || score == ""){
					$("#mngRatingLabel_"+empId+"_"+qId).html("0");
				}else{
					$("#mngRatingLabel_"+empId+"_"+qId).html(score);
				}
				if(isRatingYOrN == "N"){
					$('#appr_questionRemarkLabel_'+empId+"_"+qId).html(remarks);
				}else{
					$("#questionRemarkLabel_"+empId+"_"+qId).html(remarks);
				}
			}
			if(currentPhase == "3"){
				if(score == undefined || score == null || score == ""){
					$("#revRatingLabel_"+empId+"_"+qId).html("0");
				}else{
					$("#revRatingLabel_"+empId+"_"+qId).html(score);
				}
				$("#questionRemarkLabel_"+empId+"_"+qId).html(remarks);
			}
		}
	}
}

function changeBoxAccordingInformation(questionTitle,question){
	debugger
	$('#questionLabel').html(questionTitle);
	$('#emp_score_dd_div').hide();
	$('#emp_commentLabel > img').hide();
	$('#emp_commentLabel').html(question);
	$('#appr_score_dd_div').hide();
	$('#appr_commentLabel > img').hide();
	$('#appr_commentLabel').html("What your Appraiser would say ?");
	$('#modal_rev_sec').hide();
}

function changeBoxAccordingCompetence(){
	debugger
	$('#emp_score_dd_div').show();
	$('#emp_commentLabel').html('<img src="images/comment.png" style="width:2%;margin-right:0.5%;"></img>Comment');
	$('#appr_score_dd_div').show();
	$('#appr_commentLabel').html('<img src="images/comment.png" style="width:2%;margin-right:0.5%;"></img>Comment');
	$('#modal_rev_sec').show();
}

function setPerformnaceIndicators(qId){
	debugger
	var piMap = competencyCache.getPerformanceIndicatorsMap();
	if(piMap != undefined && piMap != null && !jQuery.isEmptyObject(piMap)){
		var piArray = piMap[qId];
		if(piArray != undefined && piArray[0] != null && piArray[0] != ""){
			var previous_pi = piArray[0];
			var pi = previous_pi.substr(0,150) + "...";
			$('#pi_previous').html(pi);
	    	$('#pi_previous').on("click",function(){
	    		var previousPILabel = piArray[0];
	    		$('#pi_previous').hide();
	    		$('#pi_previous_ta').show();
	    		$('#pi_previous_ta').focus();
	    		$('#pi_previous_ta').val(previousPILabel);
	    	});
	    	$('#pi_previous_ta').on( 'keydown', function ( e ) {
	    	    if ( e.keyCode === 27 || e.keyCode === 13) { 
	    	        var previous_pi_textarea = $('#pi_previous_ta').val();
	    	        $('#previous_pi.substr(0,150) + "...";').hide();
	    	        $('#pi_previous').show();
	    	        $('#pi_previous').html(previous_pi_textarea.substr(0,150)+"...");
	    	    }
	    	});
	    	
	    	$(document).mouseup(function (e){
	    		var container = $("#pi_previous_ta");
	    		var pi = previous_pi.substr(0,150) + "...";
	    		if (!container.is(e.target) && container.has(e.target).length === 0){
	    			container.hide()
	    			$("#pi_previous").show();
	    			$("#pi_previous").val(pi);
	    			$("#pi_previous").blur();
	    		}
	    	});
	    	
	    }else{
	    	$('#pi_previous').html("Not Available");
	    }
		if(piArray != undefined && piArray[1] != null && piArray[1] != ""){
			var current_pi = piArray[1];
			var pi = current_pi.substr(0,150) + "...";
			$('#pi_current').html(pi);
			$('#pi_current').on("click",function(){
				
	    		var currentPILabel = piArray[1];
	    		$('#pi_current').hide();
	    		$('#pi_current_ta').show();
	    		$('#pi_current_ta').focus();
	    		$('#pi_current_ta').val(currentPILabel);
	    	});
	    	$('#pi_current_ta').on( 'keydown', function ( e ) {
	    	    if ( e.keyCode === 27 || e.keyCode === 13) { 
	    	        var previous_pi_textarea = $('#pi_current_ta').val();
	    	        $('#pi_current_ta').hide();
	    	        $('#pi_current').show();
	    	        $('#pi_current').html(previous_pi_textarea.substr(0,150)+"...");
	    	    }
	    	});
	    	
	    	$(document).mouseup(function (e){
	    		var container = $("#pi_current_ta");
	    		var pi = current_pi.substr(0,150) + "...";
	    		if (!container.is(e.target) && container.has(e.target).length === 0){
	    			container.hide()
	    			$("#pi_current").show();
	    			$("#pi_current").val(pi);
	    			$("#pi_current").blur();
	    		}
	    	});
		}else{
			$('#pi_current').html("Not Available");
		}
		if(piArray != undefined && piArray[2] != null && piArray[2] != ""){
			var next_pi = piArray[2];
			var pi = next_pi.substr(0,150) + "...";
			$('#pi_next').html(pi);
			$('#pi_next').on("click",function(){
	    		var currentPILabel = piArray[2];
	    		$('#pi_next').hide();
	    		$('#pi_next_ta').show();
	    		$('#pi_next_ta').focus();
	    		$('#pi_next_ta').val(currentPILabel);
	    	});
	    	$('#pi_next').on( 'keydown', function ( e ) {
	    	    if ( e.keyCode === 27 || e.keyCode === 13) { 
	    	        var previous_pi_textarea = $('#pi_next_ta').val();
	    	        $('#pi_next_ta').hide();
	    	        $('#pi_next').show();
	    	        $('#pi_next').html(previous_pi_textarea.substr(0,150)+"...");
	    	    }
	    	});
	    	
	    	$(document).mouseup(function (e){
	    	    var container = $("#pi_next_ta");
	    	    var pi = next_pi.substr(0,150) + "...";
	    	    if (!container.is(e.target) && container.has(e.target).length === 0){
	    	        container.hide()
	    	        $("#pi_next").show();
	    	        $("#pi_next").val(pi);
	    	        $("#pi_next").blur();
	    	    }
	    	});
		}else{
			$('#pi_next').html("Not Available");
		}
	}
}


function checkAndFillValuesInElements(qId,empId){
	debugger
	var storageUnit = competencyCache.dataStorageMap; // cached map
	var status = getStatusOfTeamMember();
	var returnValues = [];
	if(currentPhase == "1"){
		 var dataArray = getQuestionAndRemarksMap(qId);
	     if(dataArray != null){
	    	 $('#emp_remarks').val(dataArray[1]);
	    	 if(dataArray[4] == "0"){
	    		 $('#emp_dropdown').val("");
	    	 }else{
	    		 $('#emp_dropdown').val(dataArray[4]);
	    	 }
	    	 returnValues.push(dataArray[1]);
	    	 returnValues.push(dataArray[4]);
	     } 
	    
		if(storageUnit != undefined && storageUnit != null && storageUnit.size > 0){
			var dataArray = storageUnit.get(empId+"_"+qId); 
			if(dataArray != undefined && dataArray != null && dataArray.length > 0){
			    $('#emp_remarks').val(dataArray[0]);
			    $('#emp_dropdown').val(dataArray[1]);
			    returnValues.push(dataArray[0]);
			    returnValues.push(dataArray[1]);
			}else{
				returnValues.push("");
			    returnValues.push(0);
			}
		}
	}
	if(currentPhase == "2"){
		 var dataArray = getQuestionAndRemarksMap(qId);
	     if(dataArray != null){
	    	 $('#emp_remarks').val(dataArray[1]);
	    	 if(dataArray[4] == "0"){
	    		 $('#emp_dropdown').val("");
	    	 }else{
	    		 $('#emp_dropdown').val(dataArray[4]);
	    	 }
	    	 $('#appr_remarks').val(dataArray[2]);
	    	 if(dataArray[5] == "0"){
	    		 $('#appr_dropdown').val("");
	    	 }else{
	    		 $('#appr_dropdown').val(dataArray[5]);
	    	 }
	    	 returnValues.push(dataArray[1]);
	    	 returnValues.push(dataArray[4]);
	    	 returnValues.push(dataArray[2]);
	    	 returnValues.push(dataArray[5]);
	    	 
	    	 
	     } 
	     if(storageUnit != undefined && storageUnit != null && storageUnit.size > 0){
	    	 var dataArray = storageUnit.get(empId+"_"+qId); 
				if(dataArray != undefined && dataArray != null && dataArray.length > 0){
				    $('#appr_remarks').val(dataArray[0]);
				    $('#appr_dropdown').val(dataArray[1]);
				    returnValues.push(dataArray[0]);
				    returnValues.push(dataArray[1]);
				}else{
					returnValues.push("");
				    returnValues.push(0);
				}
	     }
	 }    
	if(currentPhase == "3" && status==""){
		 var dataArray = getQuestionAndRemarksMap(qId);
	     if(dataArray != null){
	    	 $('#emp_remarks').val(dataArray[1]);
	    	 if(dataArray[4] == "0"){
	    		 $('#emp_dropdown').val("");
	    	 }else{
	    		 $('#emp_dropdown').val(dataArray[4]);
	    	 }
	    	 $('#appr_remarks').val(dataArray[2]);
	    	 if(dataArray[5] == "0"){
	    		 $('#appr_dropdown').val("");
	    	 }else{
	    		 $('#appr_dropdown').val(dataArray[5]);
	    	 }
	    	 returnValues.push(dataArray[1]);
	    	 returnValues.push(dataArray[4]);
	    	 returnValues.push(dataArray[2]);
	    	 returnValues.push(dataArray[5]);
	    	 
	    	 
	     } 
	     if(storageUnit != undefined && storageUnit != null && storageUnit.size > 0){
	    	 var dataArray = storageUnit.get(empId+"_"+qId); 
				if(dataArray != undefined && dataArray != null && dataArray.length > 0){
				    $('#appr_remarks').val(dataArray[0]);
				    $('#appr_dropdown').val(dataArray[1]);
				    returnValues.push(dataArray[0]);
				    returnValues.push(dataArray[1]);
				}else{
					returnValues.push("");
				    returnValues.push(0);
				}
	     }
	 }    
	
	if(currentPhase == "3" && status=="Completed"){
		 var dataArray = getQuestionAndRemarksMap(qId);
	     if(dataArray != null){
	    	 $('#emp_remarks').val(dataArray[1]);
	    	 if(dataArray[4] == "0"){
	    		 $('#emp_dropdown').val("");
	    	 }else{
	    		 $('#emp_dropdown').val(dataArray[4]);
	    	 }
	    	 $('#appr_remarks').val(dataArray[2]);
	    	 if(dataArray[5] == "0"){
	    		 $('#appr_dropdown').val("");
	    	 }else{
	    		 $('#appr_dropdown').val(dataArray[5]);
	    	 }
	    	 returnValues.push(dataArray[1]);
	    	 returnValues.push(dataArray[4]);
	    	 returnValues.push(dataArray[2]);
	    	 returnValues.push(dataArray[5]);
	     }
	    var status = getStatusOfTeamMember(empId);
	 		if(status = "Completed"){
	 			var storageUnit = competencyCache.dataStorageMap;
	 			var dataArray = getQuestionAndRemarksMap(qId); 
	 			    $('#rev_remarks').val(dataArray[3]);
				    $('#rev_dropdown').val(dataArray[6]);
				    returnValues.push(dataArray[3]);
				    returnValues.push(dataArray[6]);
	 			
	 		}
	
	     if(storageUnit != undefined && storageUnit != null && storageUnit.size > 0){
	    	 var dataArray = storageUnit.get(empId+"_"+qId); 
				if(dataArray != undefined && dataArray != null && dataArray.length > 0){
				    $('#rev_remarks').val(dataArray[0]);
				    $('#rev_dropdown').val(dataArray[1]);
				    returnValues.push(dataArray[0]);
				    returnValues.push(dataArray[1]);
				}else{
					returnValues.push("");
				    returnValues.push(0);
				}
	     }
	     
	     
   }
   
	if(currentPhase == "3" && status!=""){
		 var dataArray = getQuestionAndRemarksMap(qId);
	     if(dataArray != null){
	    	 $('#emp_remarks').val(dataArray[1]);
	    	 if(dataArray[4] == "0"){
	    		 $('#emp_dropdown').val("");
	    	 }else{
	    		 $('#emp_dropdown').val(dataArray[4]);
	    	 }
	    	 $('#appr_remarks').val(dataArray[2]);
	    	 if(dataArray[5] == "0"){
	    		 $('#appr_dropdown').val("");
	    	 }else{
	    		 $('#appr_dropdown').val(dataArray[5]);
	    	 }
	    	 returnValues.push(dataArray[1]);
	    	 returnValues.push(dataArray[4]);
	    	 returnValues.push(dataArray[2]);
	    	 returnValues.push(dataArray[5]);
	     }
	    var status = getStatusOfTeamMember(empId);
	 		if(status = "Completed"){
	 			var storageUnit = competencyCache.dataStorageMap;
	 			var dataArray = getQuestionAndRemarksMap(qId); 
	 			    $('#rev_remarks').val(dataArray[3]);
				    $('#rev_dropdown').val(dataArray[6]);
				    returnValues.push(dataArray[3]);
				    returnValues.push(dataArray[6]);
	 			
	 		}
	
	     if(storageUnit != undefined && storageUnit != null && storageUnit.size > 0){
	    	 var dataArray = storageUnit.get(empId+"_"+qId); 
				if(dataArray != undefined && dataArray != null && dataArray.length > 0){
				    $('#rev_remarks').val(dataArray[0]);
				    $('#rev_dropdown').val(dataArray[1]);
				    returnValues.push(dataArray[0]);
				    returnValues.push(dataArray[1]);
				}else{
					returnValues.push("");
				    returnValues.push(0);
				}
	     }
	     
	     
     }

     return returnValues;
}

function emptyAllValueInModalBox(){
	debugger
	$('#emp_remarks').val("");
	$('#appr_remarks').val("");
	$('#rev_remarks').val("");
	$('#emp_dropdown').select("val","");
	$('#appr_dropdown').select("val","");
	$('#rev_dropdown').select("val","");
	$('#pi_previous').html('');
	$('#pi_current').html('');
	$('#pi_next').html('');
}

function emptyAllContainers(){
	debugger
	$("#emp_dropdown").select("val","");
	$("#appr_dropdown").select("val","");
	$("#rev_dropdown").select("val","");
}

function fillScoreBox(){
	debugger
	var empScoreDropDown = $("#emp_dropdown");
	var apprScoreDropdwon = $("#appr_dropdown");
	var revScoreDropdown = $("#rev_dropdown");
	empScoreDropDown.html(new Option("", "", null, null));
	apprScoreDropdwon.html(new Option("", "", null, null));
	revScoreDropdown.html(new Option("", "", null, null));
	for(var i=1; i <= 5 ;i++ ){
		empScoreDropDown.append(new Option(i, i, null, null));	
		apprScoreDropdwon.append(new Option(i, i, null, null));
		revScoreDropdown.append(new Option(i, i, null, null));
	}
}

function getQuestionAndRemarksMap(qId){
	debugger
	var sectionMap = competencyCache.getSectionAndQuestions();
	if(sectionMap != undefined && sectionMap != null && !jQuery.isEmptyObject(sectionMap)){
		for(var section in sectionMap){
			var subMap = sectionMap[section];
			var dataArray = subMap[qId];
			if(dataArray != undefined && dataArray != null && dataArray.length > 0){
				return dataArray;
			}
		}
	}
	return null;
}

function viewAndHidePI(){
	debugger
	var sectionMap = competencyCache.getSectionAndQuestions();
    var strOverview = Object.keys(sectionMap.Overview);
    
    if(!strOverview.includes(qIdForModal)){
    	if(viewFlag){
    		$('#performanceIndicatorDiv').animate({
    		}, 0, function() {
    			$("#performanceIndicatorDiv").hide("slide", { direction: "right"},500);
    		});
    		$('#commentBoxDiv').animate({
    		    }, 2000, function() {
    		    	window.setTimeout(function(){$("#commentBoxDiv").removeClass("col-sm-9");}, 300);
    		});
    		viewFlag = false;
    	}else{
    		$('#commentBoxDiv').delay(5000).removeClass("col-sm-12");
    		$('#commentBoxDiv').delay(5000).addClass("col-sm-9");
    		$('#commentBoxDiv').delay(5000).removeAttr("style");
    		// $('#commentBoxDiv').delay(5000).prop("style","border-right:1px
			// solid #d3d5d3 !important");
    		$("#performanceIndicatorDiv").show("slide", { direction: "right"}, 800);
    		viewFlag = true;
    	}
    }
    else{
    	$('#commentBoxDiv').animate({
	    }, 2000, function() {
	    	window.setTimeout(function(){$("#commentBoxDiv").removeClass("col-sm-9");}, 300);
	});
    	$("#performanceIndicatorDiv").hide();
    }
    	
	
}

var navigationIndex = null;
function fetchNextQuestion(qId,question,empId){
	debugger
	$('#previousQuestionIcon').css({"color":"#00000"});
	hasBackAndForth = true;
	var sequencialQuestionMap = competencyCache.sequentialQuestionsMap;
	var swapPositionMap = getReverseSequenceMap(sequencialQuestionMap);
	var questionMap = competencyCache.getQuestionFromId();
	var totalElements = Object.keys(competencyCache.sequentialQuestionsMap).length;
	var currentQuestionId = null;
	if(navigationIndex != null && navigationIndex < totalElements){
		 var currentQuestionId = swapPositionMap[navigationIndex];	
		 performActionOnNextButton(swapPositionMap,questionMap,empId,currentQuestionId);
	}else{
		if(navigationIndex == null){
			if(swapPositionMap != undefined && swapPositionMap != null && !jQuery.isEmptyObject(swapPositionMap)){
				var index = sequencialQuestionMap[qId];
				navigationIndex = index;
				currentQuestionId = swapPositionMap[navigationIndex];
				performActionOnNextButton(swapPositionMap,questionMap,empId,currentQuestionId);
			}
		}else{
			navigationIndex = totalElements;
			$('#nextQuestionIcon').css({"color":"#E0E0E0"});
		}
	}
	
}

function bindRemarksLabelsWithModalValues(qId,empId){
	debugger
	var storageUnit = competencyCache.getDataStorageMap();
	var dualValueArray = [];
	if(currentPhase == "1"){
		var remarks =  $('#emp_remarks').val();
		var score = $('#emp_dropdown').val();
		dualValueArray.push(remarks);
		dualValueArray.push(score);
		storageUnit.set(empId+"_"+qId,dualValueArray);
		competencyCache.dataStorageMap = storageUnit;
	}
	if(currentPhase == "2"){
		var remarks =  $('#appr_remarks').val();
		var score = $('#appr_dropdown').val();
		dualValueArray.push(remarks);
		dualValueArray.push(score);
		storageUnit.set(empId+"_"+qId,dualValueArray);
		competencyCache.dataStorageMap = storageUnit;
	}
	if(currentPhase == "3"){
		var remarks =  $('#rev_remarks').val();
		var score = $('#rev_dropdown').val();
		dualValueArray.push(remarks);
		dualValueArray.push(score);
		storageUnit.set(empId+"_"+qId,dualValueArray);
		competencyCache.dataStorageMap = storageUnit;
	}
}

function performActionOnNextButton(swapPositionMap,questionMap,empId,currentQuestionId){
	debugger
	bindRemarksLabelsWithModalValues(currentQuestionId,empId);
	$('#emp_remarks').val("");
	$("#emp_dropdown").val("");
	$('#appr_remarks').val("");
	$('#appr_dropdown').val("");
	$('#rev_remarks').val("");
	$('#rev_dropdown').val("");
	navigationIndex++;
	var nextQuestionId = swapPositionMap[navigationIndex];
	var nextQuestion = questionMap[nextQuestionId];
	var questionRatingStatusMap = competencyCache.getMapOfQuestionIsRatedOrNot();
	var isRatingAvailable = questionRatingStatusMap[nextQuestionId];
	if(isRatingAvailable == "N"){
		$('#emp_commentLabel').html(nextQuestion);
		var informationQuestionMap = competencyCache.overviewCustomizedMap;
	    nextQuestion = informationQuestionMap[nextQuestionId];
	}
	$('#questionLabel').html(nextQuestion);
	checkAndFillValuesInElements(nextQuestionId,empId);
	setPerformnaceIndicators(nextQuestionId);
	qIdForModal = nextQuestionId;
	empIdForModal = empId;
}

function setCurrentqId(qid)
{
    this.currentqId=qid;
}

function setCurrentQuestion(question)
{
	this.currentQuestion=question;
}

function setInfoCurrentqId(qid)
{
    this.currentInfoqId=qid;
}

function setInfoCurrentQuestionTitle(questionTitle)
{
	this.currentInfoQuestionTitle=questionTitle;
}


function questionForInformationPerSectionSlider(qId,empId,section,question,isRatingEnable,questionTitle)
{
	debugger
setInfoCurrentqId(qId);
setInfoCurrentQuestionTitle(questionTitle)
$('#questionPerSection').html('');
var informationDiv = $('<div id="informationQuestionsDiv" class="col-sm-12" style="border:1px solid #ffffff;background:white;padding-left:0px !important;padding-right:0px !important;"></div>');
var headerdiv = $('<div class="col-sm-12" style="background:#ffffff;height:40px;text-align: center;">');
var questionContent = $('<div class="col-sm-2" style="background:#ffffff;height:40px;">');
var sectionMap =  competencyCache.getSectionAndQuestions();
var questionIdMap = competencyCache.getQuestionFromId();
var questionTitleMap = competencyCache.overviewCustomizedMap;
var subMap = sectionMap[section];
$("#questionlabelforinfo").html(question);
$("#modal_emp_sec").css("padding-top","0%");
for(var qId in subMap){
var question = questionIdMap[qId];
var question = questionIdMap[qId];
var questionTitle = questionTitleMap[qId];

var questionLablePerInformationSection = $('<div id="'+qId+'LabelDiv" class="col-sm-2" style="height:54px"><p id="'+qId+'Label" data-target="#" onclick="openModalBox(\''+qId+'\',\''+empId+'\',\''+section+'\',\''+question+'\',null,\''+questionTitle+'\')" style="font-weight:400;font-size:15px;cursor:pointer;font-family:Nunito Sans;color:#4A4A4A;">'+questionTitle+'</p></div>');
headerdiv.append(questionLablePerInformationSection)

}
informationDiv.append(headerdiv);
   $('#questionPerSection').append(informationDiv);
   $("#"+currentInfoqId+"Label").html("<p style='font-weight:650;color:#4A4A4A;'>"+currentInfoQuestionTitle+"</p>")
   $("#"+currentInfoqId+"LabelDiv").css("border-bottom","2.5px solid #3a97d3");
}
function questionPerSectionSlider(qId,empId,section,question,isRatingEnable,questionTitle){
	debugger
	setCurrentqId(qId);
	setCurrentQuestion(question)
	$('#questionPerSection').html('');
	$("#questionlabelforinfo").html('');
	if(getQuestionPerSection(section)>5){
		var competencyDiv = $('<div id="competencyQuestionsDiv" class="col-sm-12 container-scroll" style="border:1px solid #ffffff;background:white;padding-left:0px !important;padding-right:0px !important;"></div>');
		var headerdiv = $('<div class="row" style="background:#ffffff;height:40px;">');	
		}
		else{
		var competencyDiv = $('<div id="competencyQuestionsDiv" class="col-sm-12" style="border:1px solid #ffffff;background:white;padding-left:0px !important;padding-right:0px !important;"></div>');
		var headerdiv = $('<div class="col-sm-12" style="background:#ffffff;height:40px;">');
		}
	var questionContent = $('<div id="'+qId+'LabelDiv" class="col-sm-2" style="background:#ffffff;height:40px;text-align:center;">');
	var sectionMap =  competencyCache.getSectionAndQuestions();
	var questionIdMap = competencyCache.getQuestionFromId();
			var subMap = sectionMap[section];
		for(var qId in subMap){
			var question = questionIdMap[qId];
			if(getQuestionPerSection(section)>5){
				var questionLablePerSection = $('<div id="'+qId+'LabelDiv" class="col-sm-2" style="width:25%;text-align:center;height:43px"><p id="'+qId+'Label" data-target="#" onclick="openModalBox(\''+qId+'\',\''+empId+'\',\''+section+'\',\''+question+'\',\''+isRatingEnable+'\')" style="font-weight:400;font-size:15px;cursor:pointer;font-family: Nunito Sans;color:#4A4A4A;">'+question+'</p></div>');
				}
				else{
				var questionLablePerSection = $('<div id="'+qId+'LabelDiv" class="col-sm-2" style="width:20%;text-align:center;height:54px"><p id="'+qId+'Label" data-target="#" onclick="openModalBox(\''+qId+'\',\''+empId+'\',\''+section+'\',\''+question+'\',\''+isRatingEnable+'\')" style="font-weight:400;font-size:15px;cursor:pointer;font-family: Nunito Sans;color:#4A4A4A;">'+question+'</p></div>');
				}
			headerdiv.append(questionLablePerSection)
			
		}
		$('.col-sm-2').click(function(){
			  $(this).toggleClass(' style="background-color: yellow;"');
			});
		
		competencyDiv.append(headerdiv);
	    $('#questionPerSection').append(competencyDiv);
	    $("#"+currentqId+"Label").html("<p style='font-weight:650;color:#4A4A4A;'>"+currentQuestion+"</p>")
        $("#"+currentqId+"LabelDiv").css("border-bottom","2.5px solid #3a97d3");
}

function getReverseSequenceMap(sequencialQuestionMap){
	debugger
	var revereseSequenceMap = {};
	if(sequencialQuestionMap != undefined && sequencialQuestionMap != null && !jQuery.isEmptyObject(sequencialQuestionMap)){
		for(var key in sequencialQuestionMap){
			var sequence = sequencialQuestionMap[key];
			revereseSequenceMap[sequence] = key;
		}
	}
	return revereseSequenceMap;
}

function fetchPreviousQuestion(qId,question,empId){
	debugger
	$('#nextQuestionIcon').css({"color":"#000000"});
	hasBackAndForth = true;
	var sequencialQuestionMap = competencyCache.sequentialQuestionsMap;
	var swapPositionMap = getReverseSequenceMap(sequencialQuestionMap);
	var questionMap = competencyCache.getQuestionFromId();
	var totalElemenets = Object.keys(competencyCache.sequentialQuestionsMap).length;
	var currentQuestionId = null;
	if(navigationIndex != null && navigationIndex > 1){
		currentQuestionId = swapPositionMap[navigationIndex];	
		performActionOnPreviousButton(swapPositionMap,questionMap,empId,currentQuestionId);
	}else{
		if(navigationIndex == null){
			if(swapPositionMap != undefined && swapPositionMap != null && !jQuery.isEmptyObject(swapPositionMap)){
				var index = sequencialQuestionMap[qId];
				navigationIndex = index
				currentQuestionId = swapPositionMap[navigationIndex];;
				performActionOnPreviousButton(swapPositionMap,questionMap,empId,currentQuestionId);
			}
		}else{
			navigationIndex = 1;
			$('#previousQuestionIcon').css({"color":"#E0E0E0"});
		}
	}
}

function performActionOnPreviousButton(swapPositionMap,questionMap,empId,currentQuestionId){
	debugger
	bindRemarksLabelsWithModalValues(currentQuestionId,empId);
	$('#emp_remarks').val("");
	$("#emp_dropdown").val("");
	$('#appr_remarks').val("");
	$('#appr_dropdown').val("");
	$('#rev_remarks').val("");
	$('#rev_dropdown').val("");
	navigationIndex--;
	var prevQuestionId = swapPositionMap[navigationIndex];
	var prevQuestion = questionMap[prevQuestionId];
	var questionRatingStatusMap = competencyCache.getMapOfQuestionIsRatedOrNot();
	var isRatingAvailable = questionRatingStatusMap[prevQuestionId];
	if(isRatingAvailable == "N"){
		$('#emp_commentLabel').html(prevQuestionId);
		var informationQuestionMap = competencyCache.overviewCustomizedMap;
	    nextQuestion = informationQuestionMap[prevQuestionId];
	}
	$('#questionLabel').html(prevQuestion);
	checkAndFillValuesInElements(prevQuestionId,empId);
	setPerformnaceIndicators(prevQuestionId);
	qIdForModal = prevQuestionId;
	empIdForModal = empId;
}

/**
 * ******************************************************Information Screen
 * UI**********************************************************************
 */

function showInformation(){
	debugger
	$('#headerOfFullContentDiv').html('');
	$('#fullContentDiv').html('');
	if(this.isDriectorFlag==true){
		$("#headerOfFullContentDiv").show();
		}
	$('#previousQuestionIcon').css({"color":"#E0E0E0"});
	$('#nextQuestionIcon').css({"color":"#00000"});
	appendSubmitButtonOnTop();
	highlightInformationLabel();
	competencyCache.sequentialQuestionsMap = {};
	navigationIndex = null;
	var informationDiv = $('<div id="informationDiv" class="container-fluid" style="background:white;padding-left:0px !important;padding-right:0px !important;"></div>');
	var dataInformationDiv = $('<div id="dataInformationDiv" class="col-sm-12"></div>');
	var mainHeaderDiv = $('<div class="col-sm-12" style="color:#4A4A4A;font-family:Nunito Sans;padding-top:7px;font-size: 18px;font-weight: 800;">').html('Appraisal Summary');
	var brDiv = $('<div class=col-sm-12><br>');
	var rowHeaderDiv = $('<div class="col-sm-12" style="background-color:#F9F9F9;">')
    var header1 = $('<div class="col-sm-4" style="text-align:left;font-family:Nunito Sans;padding-top:8px;height:40px;font-weight:600;">').html('CATEGORIES');
    var header2 = $('<div class="col-sm-4" style="text-align:center;font-family:Nunito Sans;height:40px;padding-top:8px;font-weight:600;;">').html();
    var header3 = $('<div class="col-sm-4" style="text-align:center;font-family:Nunito Sans;padding-top:8px;height:40px;font-weight:600;">').html();
    var informationBody = prepareBodyForInformation("Overview");
    dataInformationDiv.append(mainHeaderDiv);
    dataInformationDiv.append(brDiv);
    rowHeaderDiv.append(header1);
    rowHeaderDiv.append(header2);
    rowHeaderDiv.append(header3);
    dataInformationDiv.append(rowHeaderDiv);
    informationDiv.append(dataInformationDiv);
    informationDiv.append(informationBody);
    $('#fullContentDiv').append(informationDiv);
    $("#showInformationLabel").css("font-weight","bold");
    validationsOnSubmit();
}


function prepareBodyForInformation(section){
	debugger
	var bodyContainer = $('<div class="col-sm-12">');
	var sectionMap =  competencyCache.getSectionAndQuestions();
	var questionIdMap = competencyCache.getQuestionFromId();
	var questionTitleMap = competencyCache.overviewCustomizedMap;
	var empId = "";
	if(teamMemberId != null && teamMemberId != ""){
		empId = teamMemberId
	}else{
		empId = user.apprempid;
	}
	if(sectionMap != undefined && sectionMap != null && !jQuery.isEmptyObject(sectionMap)){
			var subMap = sectionMap[section];
			var sequenceMap = competencyCache.sequentialQuestionsMap;
			var counter = 1;
			for(var qId in subMap){
				var empRemarks = "";
				var mngRemarks = "";
			    var question = questionIdMap[qId];
			    var questionTitle = questionTitleMap[qId];
				var storageUnit = competencyCache.dataStorageMap;
				if(storageUnit != undefined && storageUnit != null && storageUnit.size > 0){
					var returnValueArray = checkAndFillValuesInElements(qId,empId);
					if(currentPhase == "1"){
						empRemarks = returnValueArray[0];
					}else if(currentPhase == "2"){
						empRemarks = returnValueArray[0];
						mngRemarks = returnValueArray[2];
					}
				}else{
					var dataArray = subMap[qId];
					if(dataArray != undefined && dataArray != "" && dataArray.length > 0){
						empRemarks = dataArray["1"];
						mngRemarks = dataArray["2"];
					}
				}
				sequenceMap[qId] = counter;
				var nameOfInformation = $('<div class="col-sm-12" style="height: auto;font-weight:500;padding:0.5%;">');
	    		var label1 = $('<label class="col-sm-12" style="padding-left:2%;cursor:pointer;color: #3A97D3;margin-top:1%;font-weight:500;height:30px;overflow-y:auto;" onclick="openModalBox(\''+qId+'\',\''+empId+'\',\''+section+'\',\''+question+'\',null,\''+questionTitle+'\')">'+questionTitle+'</label>');
	    		var pencilDiv = $('<img class="pull-right" src="images/Edit.svg" onclick="openModalBox(\''+qId+'\',\''+empId+'\',\''+section+'\',\''+question+'\',null,\''+questionTitle+'\')" style="cursor:pointer;">')
	    		label1.append(pencilDiv);
	    		nameOfInformation.append(label1);
	    		var employeeRemarkDiv = $('<div class="col-sm-4" style="height: auto;font-weight:500;padding:0.5%;">');
	    		var empRemarksLabel = $('<label class="col-sm-12" id="questionRemarkLabel_'+empId+"_"+qId+'" style="padding-left:5%;cursor:pointer;margin-top:1%;font-weight:200;height:30px;overflow-y:auto;">');
	    		var managerRemarksDiv = $('<div class="col-sm-4"  style="height: auto;font-weight:500;padding:0.5%;">');
	    		var mngRemarksLabel = $('<label class="col-sm-12" id="appr_questionRemarkLabel_'+empId+"_"+qId+'" style="padding-left:5%;cursor:pointer;margin-top:1%;font-weight:200;height:30px;overflow-y:auto;">');
	    		if(empRemarks != ""&&empRemarks!=null){
	    			if(empRemarks.length>=20)
	    	         {
	    	           var minEmpRemarks = empRemarks.substring(0,20)+"...<span id='readMoreEmp' data-toggle='modal' data-target='#myModal' style='cursor:pointer;font-weight:600'>Read More</span>";
	    	           empRemarksLabel.html(minEmpRemarks);
	    	           $("#popuplabelemptext").html("");
	    	           $("#popuplabelemptext").html(empRemarks);
	    	         }
	    	        else{
	    	         empRemarksLabel.html(empRemarks);
	    	          }
	    		   	}
	    		   	if(mngRemarks != ""&&mngRemarks!=null){
	    		   		if(mngRemarks.length>=20)
	    		          {
	    		            var minMngRemarks = mngRemarks.substring(0,20)+"...<span id='readMoreAppr'data-toggle='modal' data-target='#myModal' style='cursor:pointer;font-weight:600'>Read More</span>";
	    		            mngRemarksLabel.html(minMngRemarks);
	    		            $("#popuplabelemptext").html("");
	    		            $("#popuplabelemptext").html(mngRemarks);
	    		          }
	    		        else{
	    		         mngRemarksLabel.html(mngRemarks);
	    		       }
	    		   	}
	    		employeeRemarkDiv.append(empRemarksLabel);
	    		managerRemarksDiv.append(mngRemarksLabel);
	    		
	    		counter++;
			}   
			bodyContainer.append(nameOfInformation);
			firstAndLastQuestion()
			competencyCache.sequentialQuestionsMap = sequenceMap;
			createStrengthLabel(empId,bodyContainer);
			
			createWeaknessLabel(empId,bodyContainer);
		
	}else{
		var errorDiv = $('<div class="col-sm-12" id="errorDiv">').html("No data available");
    	bodyContainer.append(errorDiv);
	}
	return bodyContainer;
}

function createStrengthLabel(empId,element){
	debugger
	var strengthDiv = $('<div class="col-sm-12" style="height: auto;font-weight:500;padding:0.5%;">');
	var label1 = $('<label class="col-sm-12" style="width:100%;padding-left:2%;cursor:pointer;color: #3A97D3;margin-top:1%;font-weight:500;height:30px;overflow-y:auto;" onclick="openSWBox(\''+empId+'\',\'Strengths\')">Strength</label>');
    var pencilDiv = $('<img class="pull-right" src="images/Edit.svg" onclick="openSWBox(\''+empId+'\',\'Strengths\')" style="cursor:pointer;">')
    label1.append(pencilDiv);
	strengthDiv.append(label1);
	element.append(strengthDiv);
}

function createWeaknessLabel(empId,element){
	debugger
	var weaknessDiv = $('<div class="col-sm-12" style="height: auto;font-weight:500;padding:0.5%;">');
	var label1 = $('<label class="col-sm-12" style="width:100%;padding-left:2%;cursor:pointer;color: #3A97D3;margin-top:1%;font-weight:500;height:30px;overflow-y:auto;" onclick="openSWBox(\''+empId+'\',\'Weaknesses\')">Weakness</label>');
    var pencilDiv = $('<img class="pull-right" src="images/Edit.svg" onclick="openSWBox(\''+empId+'\',\'Weaknesses\')" style="cursor:pointer;">')
	label1.append(pencilDiv);
    weaknessDiv.append(label1);
	element.append(weaknessDiv);
}


function showAllStrengthView(empId,element){
	debugger
	var employeeRemarkDiv = $('<div class="col-sm-4" style="border-bottom:1px solid #d3d5d3;height: auto;font-weight:500;padding:0.5%;">');
	var empRemarksLabel = $('<label  id="strengths_'+empId+'" style="padding-top:3%;padding-left:5%;cursor:pointer;margin-top:1%;font-weight:200;height:80px;overflow-y:auto;">');
	var managerRemarksDiv = $('<div class="col-sm-4"  style="border-bottom:1px solid #d3d5d3;height: auto;font-weight:500;padding:0.5%;">');
	var mngRemarksLabel = $('<label id="appr_strengths_'+empId+'" style="padding-top:3%;padding-left:5%;cursor:pointer;margin-top:1%;font-weight:200;height:80px;overflow-y:auto;">');	
	var strengthArray = fetchSWFromCache(empId,'Strengths');
	renderStrengthsOnInformationScreen(empRemarksLabel,mngRemarksLabel,strengthArray);
	employeeRemarkDiv.append(empRemarksLabel);
	managerRemarksDiv.append(mngRemarksLabel);
	element.append(employeeRemarkDiv);
	element.append(managerRemarksDiv);
}

function renderStrengthsOnInformationScreen(empStrength,apprStrength,strengthArray){
	debugger
	if((currentPhase == 2 || currentPhase == 1) && strengthArray.length > 0){
		for(var i=0; i < strengthArray.length; i++){
			var li = $('<li style="list-style-position: outside;">').html(strengthArray[i]);
			empStrength.append(li);
		}
	}
	if(currentPhase == 3 && strengthArray.length > 0){
		for(var i=0; i < strengthArray.length; i++){
			var li = $('<li style="list-style-position: outside;">').html(strengthArray[i]);
			if(i < 3){
				empStrength.append(li);
			}else{
				apprStrength.append(li);
			}
		}
	}
	
}

function showAllWeaknessView(empId,element){
	debugger
	var employeeRemarkDiv = $('<div class="col-sm-4" style="border-bottom:1px solid #d3d5d3;height: auto;font-weight:500;padding:0.5%;">');
	var empRemarksLabel = $('<label id="weaknesses_'+empId+'" style="padding-left:5%;cursor:pointer;margin-top:1%;font-weight:200;height:80px;overflow-y:auto;">');
	var weaknessArray = fetchSWFromCache(empId,'Weaknesses');
	var managerRemarksDiv = $('<div class="col-sm-4"  style="border-bottom:1px solid #d3d5d3;height: auto;font-weight:500;padding:0.5%;">');
	var mngRemarksLabel = $('<label id="appr_weaknesses_'+empId+'" style="padding-left:5%;cursor:pointer;margin-top:1%;font-weight:200;height:80px;overflow-y:auto;">');	
	renderStrengthsOnInformationScreen(empRemarksLabel,mngRemarksLabel,weaknessArray);
	employeeRemarkDiv.append(empRemarksLabel);
	managerRemarksDiv.append(mngRemarksLabel);
	element.append(employeeRemarkDiv);
	element.append(managerRemarksDiv);
}

function openSWBox(empId,question){
	debugger
	alignSWBox();
	emptyAllValuesInSWBox();
	$('#questionLabelSW').html(question);
	if(question == "strength"){
		$('#sOrwLabel').html('List out your '+question.toLowerCase()+'.');
	}else{
		$('#sOrwLabel').html('List out your '+question.toLowerCase()+'.');
	}
	fetchSWFromCache(empId,question);
	$('#saveSW').on("click",function(){
		var question = $('#questionLabelSW').text();
		var char1 = "";
		var char2 = "";
		var char3 = "";
		if(currentPhase == 1){
			char1 = $('#emp_SW1').val();
			char2 = $('#emp_SW2').val();
			char3 = $('#emp_SW3').val();
		}
		if(currentPhase == 2){
			char1 = $('#appr_SW1').val();
			char2 = $('#appr_SW2').val();
			char3 = $('#appr_SW3').val();
		}
		var storageUnit = competencyCache.getStrengthAndWeaknessMap();
	    var swContainerArray = [];
	    swContainerArray.push(char1);
	    swContainerArray.push(char2);
	    swContainerArray.push(char3);
	    storageUnit.set(empId+"_"+question,swContainerArray);
	    competencyCache.strengthAnsWeaknessMap = storageUnit;
	    appendSWInInformationView();
	});
	setValidationsForSWBox();  // strength and weakness box validations based
								// on role
	hideAndShowPI(true);
}

function emptySWInInformationUI(empId,cp,question){
	debugger
	if(question == "Strengths" && cp == 1){
		$('#strengths_'+empId).html('');
	}if(question == "Weaknesses" && cp == 1){
		$('#weaknesses_'+empId).html('');
	}
	if(question == "Strengths" && cp == 2){
		$('#appr_strengths_'+empId).html('');
	}
	if(question == "Weaknesses" && cp == 2){
		$('#appr_weaknesses_'+empId).html('');
	}
}

function appendSWInInformationView(){
	debugger
	var empId = getUserId(); 
	var question = $('#questionLabelSW').text();
	emptySWInInformationUI(empId,currentPhase,question);
	var swMap = competencyCache.getStrengthAndWeaknessMap();
	if(swMap != null && swMap.size > 0){
			var key = empId+"_"+question;
			var swArray = swMap.get(key);
			if(swArray != undefined && swArray != null && swArray.length > 0){
				for(var i=0; i < swArray.length; i++){
					if(question == "Strengths" && currentPhase == 1){
						var li = $('<li style="list-style-position: outside;">').html(swArray[i]);
						$('#strengths_'+empId).append(li);
					}
					if(question == "Strengths" && currentPhase == 2){
						var li = $('<li style="list-style-position: outside;">').html(swArray[i]);
						$('#appr_strengths_'+empId).append(li);
					}
					if(question == "Weaknesses" && currentPhase == 1){
						var li = $('<li style="list-style-position: outside;">').html(swArray[i]);
						$('#weaknesses_'+empId).append(li);
					}
					if(question == "Weaknesses" && currentPhase == 2){
						var li = $('<li style="list-style-position: outside;">').html(swArray[i]);
						$('#appr_weaknesses_'+empId).append(li);
					}
				}
			}
	}
}

function emptyAllValuesInSWBox(){
	debugger
	$('#emp_SW1').val('');
	$('#emp_SW2').val('');
	$('#emp_SW3').val('');
	$('#appr_SW1').val('');
	$('#appr_SW2').val('');
	$('#appr_SW3').val('');
}

function fetchSWFromCache(empId,question){
	debugger
	var storageUnit = competencyCache.getStrengthAndWeaknessMap();
	var swMap = competencyCache.getStrengthAndWeaknessServerDataMap();
	var returnValuesArray = [];
	if(currentPhase ==  1){
		if(storageUnit != undefined && storageUnit != null && storageUnit.size > 0){
			var dataArray = storageUnit.get(empId+"_"+question); 
			if(dataArray != undefined && dataArray != null && dataArray.length > 0){
			    $('#emp_SW1').val(dataArray[0]);
			    $('#emp_SW2').val(dataArray[1]);
			    $('#emp_SW3').val(dataArray[2]);
			    returnValuesArray = dataArray;
			}
		}
	}else if(currentPhase == "2"){
	     var dataArray = swMap["1_"+question];
		 if(dataArray != null){
	    	 $('#emp_SW1').val(dataArray[0]);
	    	 $('#emp_SW2').val(dataArray[1]);
	    	 $('#emp_SW3').val(dataArray[2]);
	    	 returnValuesArray.push(dataArray[0]);
	    	 returnValuesArray.push(dataArray[1]);
	    	 returnValuesArray.push(dataArray[2]);
	     }
		
	     if(storageUnit != undefined && storageUnit != null && storageUnit.size > 0){
	    	 
	 		 var dataArray = storageUnit.get(empId+"_"+question); 
				if(dataArray != undefined && dataArray != null && dataArray.length > 0){
				    $('#appr_SW1').val(dataArray[0]);
				    $('#appr_SW2').val(dataArray[1]);
				    $('#appr_SW3').val(dataArray[2]);
				    returnValuesArray.push(dataArray[0]);
				    returnValuesArray.push(dataArray[1]);
				    returnValuesArray.push(dataArray[2]);
				}else{
					returnValuesArray.push("");
				    returnValuesArray.push("");
				    returnValuesArray.push("");
				}
	     }
	}else{
		var empSWArray = swMap["1_"+question];
		var empApprSWArray = swMap["2_"+question];
		$('#emp_SW1').val(empSWArray[0]);
   	 	$('#emp_SW2').val(empSWArray[1]);
   	 	$('#emp_SW3').val(empSWArray[2]);
		$('#appr_SW1').val(empApprSWArray[0]);
	    $('#appr_SW2').val(empApprSWArray[1]);
	    $('#appr_SW3').val(empApprSWArray[2]);
	    pushSWInFinalDataArray(empSWArray,empApprSWArray,returnValuesArray)
	} 
	return returnValuesArray;
}


function pushSWInFinalDataArray(empSWArray,empApprSWArray,returnValuesArray){
	debugger
	returnValuesArray.push(empSWArray[0]);
	returnValuesArray.push(empSWArray[1]);
	returnValuesArray.push(empSWArray[2]);
	returnValuesArray.push(empApprSWArray[0]);
	returnValuesArray.push(empApprSWArray[1]);
	returnValuesArray.push(empApprSWArray[2]);
}

function alignSWBox(){
	debugger
	var bodyWidth = $(window).outerWidth();
	var bodyHeight = $(window).height();
	var widthPercentage = (bodyWidth * 10) / 100;
	var heightPercentage = (bodyHeight * 5) / 100;
	$('#strengthAndWeaknessBox').css({'left': widthPercentage+'px !important','top':heightPercentage+'px !important'});
	$('#strengthAndWeaknessBox').modal('show');
}

/**
 * **********************************************************************************
 * AJAX
 * **************************************************************************************
 */

function getCompetencyDataFromServer(){
	debugger
	var empId = "";
	if(teamMemberId != null && teamMemberId != ""){
		empId = teamMemberId
	}else{
		empId = user.apprempid;
	}
	var data = null;
	$.ajax({
		type : "POST",
		url : getMyFormDataURL,
		async : false,
		data : {
			cycleId : apprCycle.cycleId,
			empId : empId
		},
		beforeSend : function() {
			$("body").showLoading();
		},
		complete : function() {
			$("body").hideLoading();
		},
		error : function(response, error, thrownError) {
			displayError(response, error, thrownError);
		},
		success : function success(response) {
			var res = response;
			if (res.status) {
			     data = eval(res);
			     competencyCache.sectionMap = eval('('+data.sectionMap+ ')'); 
			     competencyCache.questionMap = eval('('+data.questionMap+ ')');
			     competencyCache.finalScoreMap = eval('('+data.finalScoreMap+ ')');
			     competencyCache.phaseScoreContainer = eval('('+data.eachPhaseScore+ ')');
			     competencyCache.piIndicatorsMap = eval('('+data.piMap+ ')');
			     competencyCache.questionRatingStatusMap = eval('('+data.ratingStatusMap+')');
			     competencyCache.strengthAndWeaknessServerDataMap = eval('('+data.swMap+')');
			     currentPhase = data.currentPhase; 
			} else {
				showToster('Error !', res.errorMessage, 5, "error");
			}
		}
	});
	return data;
}

function updateCompetencies(status){
	console.log("Inside updateCompetencies");
	var res = null;
	var cachedDataMap = competencyCache.getDataStorageMap();
	var map = JSON.stringify([...cachedDataMap]);
	var swCachedDataMap = competencyCache.getStrengthAndWeaknessMap();
	var swMap = JSON.stringify([...swCachedDataMap]);
	var empId = getUserId();
	var apprId = user.apprempid;
	$.ajax({
		type : "POST",
		url : updateCompetenciesURL,
		async : false,
		data : {
			empId : empId,
			dataMap : map,
			cycleId : apprCycle.cycleId,
			phaseId : currentPhase,
			strgWeakMap : swMap,
			appraiserId : apprId,
			status : status
 		},
		beforeSend : function() {
			$("body").showLoading();
		},
		complete : function() {
			$("body").hideLoading();
		},
		error : function(response, error, thrownError) {
			displayError(response, error, thrownError);
		},
		
		success : function success(response) {
			res = response;
			if (res.status) {
				 showToster('Success !', "Successfully submitted !", 5, "success");
			     data = eval(res);
			     competencyCache.sectionMap = eval('('+data.sectionMap+ ')'); 
			     competencyCache.questionMap = eval('('+data.questionMap+ ')');
			     competencyCache.finalScoreMap = eval('('+data.finalScoreMap+ ')');
			     competencyCache.phaseScoreContainer = eval('('+data.eachPhaseScore+ ')');
			     currentPhase = data.currentPhase;
			     userGeneralInfo = eval('('+ data.userGeneralInfo +')');
			     myTeamDataMap = eval('('+ data.myTeamData +')');
			     competencyCache.strengthAndWeaknessServerDataMap = eval('('+data.swMap+')');
			     competencyCache.dataStorageMap.clear();
			     competencyCache.strengthAnsWeaknessMap.clear();
			     showCompetencies(empId);
			     
			} else {
				showToster('Error !', res.errorMessage, 5, "error");
			}
		}
	});
	console.log("updateCompetencies completed response is=" +res);
	return res;
}


function saveCompetencies(status){
	debugger
	var res = null;
	var cachedDataMap = competencyCache.getDataStorageMap();
	var map = JSON.stringify([...cachedDataMap]);
	var swCachedDataMap = competencyCache.getStrengthAndWeaknessMap();
	var empId = getUserId();
	var apprId = user.apprempid;
	sessionStorage.myMap = JSON.stringify(Array.from(swCachedDataMap.entries()));
	$.ajax({
		type : "POST",
		url : saveCompetenciesURL,
		async : false,
		data : {
			empId : empId,
			dataMap : map,
			cycleId : apprCycle.cycleId,
			phaseId : currentPhase,
			appraiserId : apprId,
			status : status
 		},
		beforeSend : function() {
			$("body").showLoading();
		},
		complete : function() {
			$("body").hideLoading();
		},
		error : function(response, error, thrownError) {
			displayError(response, error, thrownError);
		},
		success : function success(response) {
			res = response;
			if (res.status) {
				 showToster('Success !', "Successfully saved !", 5, "success");
			     data = eval(res);
			     competencyCache.sectionMap = eval('('+data.sectionMap+ ')'); 
			     competencyCache.questionMap = eval('('+data.questionMap+ ')');
			     competencyCache.finalScoreMap = eval('('+data.finalScoreMap+ ')');
			     competencyCache.phaseScoreContainer = eval('('+data.eachPhaseScore+ ')');
			     userGeneralInfo = eval('('+ data.userGeneralInfo +')');
			     myTeamDataMap = eval('('+ data.myTeamData +')');
			    competencyCache.strengthAndWeaknessServerDataMap = new Map(JSON.parse(sessionStorage.myMap));
			     prepareBodyForCompetency();
			} else {
				showToster('Error !', res.errorMessage, 5, "error");
			}
		}
	});
	return res;
}

function saveBeforeUpdate(){
	debugger
	var res = null;
	var cachedDataMap = competencyCache.getDataStorageMap();
	var map = JSON.stringify([...cachedDataMap]);
	var empId = getUserId();
	var apprId = user.apprempid;
	$.ajax({
		type : "POST",
		url : saveCompetenciesURL,
		async : false,
		data : {
			empId : empId,
			dataMap : map,
			cycleId : apprCycle.cycleId,
			phaseId : currentPhase,
			appraiserId : apprId
 		},
		beforeSend : function() {
			$("body").showLoading();
		},
		complete : function() {
			$("body").hideLoading();
		},
		error : function(response, error, thrownError) {
			displayError(response, error, thrownError);
		},
		success : function success(response) {
			res = response;
			if (res.status) {
			     data = eval(res);
			     competencyCache.sectionMap = eval('('+data.sectionMap+ ')'); 
			     competencyCache.questionMap = eval('('+data.questionMap+ ')');
			     competencyCache.finalScoreMap = eval('('+data.finalScoreMap+ ')');
			     competencyCache.phaseScoreContainer = eval('('+data.eachPhaseScore+ ')');
			     userGeneralInfo = eval('('+ data.userGeneralInfo +')');
			     myTeamDataMap = eval('('+ data.myTeamData +')');
			     
			} else {
				showToster('Error !', res.errorMessage, 5, "error");
			}
		}
	});
	return res;
}
function sendMailToAppraiser(){
	debugger
	var empId = getUserId();
	var date = new Date();
	var CurrentDate = date.toDateString();
	var res = null;
	$.ajax({
	type : "POST",
	url : sendMailToAppraiserURL,
	async : true,
	data : {
	empId : empId,
	cycleId:apprCycle.cycleId,
	date:CurrentDate,
	phaseId:newPhaseId
	},
	beforeSend : function() {
	$("body").showLoading();
	},
	complete : function() {
	$("body").hideLoading();
	},
	error : function(response, error, thrownError) {
	displayError(response, error, thrownError);
	},
	success : function success(response) {
	res = response;
	if (res.status) {
	showToster('Success !', "Successfully submitted !", 5, "success");
	} else {
	showToster('Error !', res.errorMessage, 5, "error");
	}
	}
	});
	}

function getReviewerFinalRating(){
	debugger
	var res = null;
	$.ajax({
		type : "POST",
		url : getreviewerfinalratingURL,
		async : false,
		data : {
			cycleId:apprCycle.cycleId,
			empId:getUserId()
		},
		error : function(response, error, thrownError) {
			displayError(response, error, thrownError);
		},
		success : function success(response) {
			res = eval(response);
		}
	});
	return res;
}




/** ***********************************************************************Validations************************************************************* */
Date.prototype.addDays = function(days) {
	   this.setDate(this.getDate() + parseInt(days));
	   return this;
	};
var validationNumber = null;
function setValidations(){
	debugger
	var userrole = getUserRole();
	var isFinalized = apprCycle.isFinalized;
	var CurrentDate = new Date();
	var status = getStatusOfTeamMember();
	var SelfApprEndDate=new Date(moment(apprCycle.selfApprEndDate).format('DD-MMM-YY'));
	var MngApprEndDate= new Date(moment(apprCycle.mngApprEndDate).format('DD-MMM-YY'));
	var RevApprEndDate = new Date(moment(apprCycle.revApprEndDate).format('DD-MMM-YY'));
	var SelfApprStartDate = new Date(moment(apprCycle.selfApprStartDate).format('DD-MMM-YY'));
	var MngApprStartDate = new Date(moment(apprCycle.mngApprStartDate).format('DD-MMM-YY'));
	var RevApprStartDate = new Date(moment(apprCycle.revApprStartDate).format('DD-MMM-YY'));
	SelfApprEndDate = SelfApprEndDate.addDays(1);
	MngApprEndDate = MngApprEndDate.addDays(1);
	RevApprEndDate = RevApprEndDate.addDays(1);

	// Date Validation
	
	if ((teamMemberId == null || teamMemberId == "")&&(SelfApprStartDate<=CurrentDate)&&(CurrentDate<=SelfApprEndDate)&&currentPhase==1) {
	    enableEmployeeFields();
	    $("#rateappr").attr("disabled", "disabled").off('click');
		$("#raterev").attr("disabled", "disabled").off('click');
	    validationNumber = 0;
	}
	else if ((userrole == "ESS" || userrole == "Appraiser" || userrole == "Reviewer") && currentPhase > 1 && (teamMemberId == null||teamMemberId=="")) {
	    disableAllFields();
	    tosterValidation(false);
	    $("#rateemp").attr("disabled", "disabled").off('click');
	    $("#rateappr").attr("disabled", "disabled").off('click');
		$("#raterev").attr("disabled", "disabled").off('click');
	    validationNumber = 3;
	    $('#submitCompetenciesBtn').prop("disabled","true");
		$('#submitCompetenciesBtn').css({"cursor":"not-allowed"});
		$('#saveCompetenciesBtn').prop("disabled","true");
		$('#saveCompetenciesBtn').css({"cursor":"not-allowed"});
	}
	else if ((teamMemberId != null && teamMemberId != "" && currentPhase == 2 && userrole!="Reviewer")&&(MngApprStartDate<=CurrentDate)&&(CurrentDate<=MngApprEndDate)&&currentPhase==2) {
	    enableAppraiserFields();
	    $("#rateemp").attr("disabled", "disabled").off('click');
		$("#raterev").attr("disabled", "disabled").off('click');
	    validationNumber = 1;
	}
	else if (teamMemberId != null && teamMemberId != "" && currentPhase == 1 && (userrole == "Appraiser"||userrole == "Reviewer")) {
	    disableAllFields();
	    tosterValidation(false);
	    $("#rateemp").attr("disabled", "disabled").off('click');
	    $("#rateappr").attr("disabled", "disabled").off('click');
		$("#raterev").attr("disabled", "disabled").off('click');
	    validationNumber = 3;
	    $('#submitCompetenciesBtn').prop("disabled","true");
		$('#submitCompetenciesBtn').css({"cursor":"not-allowed"});
		$('#saveCompetenciesBtn').prop("disabled","true");
		$('#saveCompetenciesBtn').css({"cursor":"not-allowed"});
	}
	else if ((teamMemberId != null && teamMemberId != "" && currentPhase > 2 && userrole == "Reviewer")&&(RevApprStartDate<=CurrentDate)&&(CurrentDate<=RevApprEndDate)&&currentPhase==3) {
	    enableReviewerFields();
	    $("#rateappr").attr("disabled", "disabled").off('click');
		$("#rateemp").attr("disabled", "disabled").off('click');
	    validationNumber = 2;
	}
	
	else if (isFinalized == "isFinished" || (teamMemberId != null && teamMemberId != "" && currentPhase == 3 && status=="")) {
		 enableAppraiserFields();
		    $("#rateemp").attr("disabled", "disabled").off('click');
			$("#raterev").attr("disabled", "disabled").off('click');
		    validationNumber = 1;
	}
	
	else if (isFinalized == "isFinished" || (teamMemberId != null && teamMemberId != "" && currentPhase == 3 && status=="Completed")) {
	    enableReviewerFields();
	    $("#rateappr").attr("disabled", "disabled").off('click');
		$("#rateemp").attr("disabled", "disabled").off('click');
	    validationNumber = 2;
	}
	
	else if (isFinalized == "isFinished" || (currentPhase == 2 && userrole == "Reviewer") || (teamMemberId != null && teamMemberId != "" && currentPhase > 2 && userrole == "Appraiser")) {
	    disableAllFields();
	    tosterValidation(false);
	    $("#rateemp").attr("disabled", "disabled").off('click');
	    $("#rateappr").attr("disabled", "disabled").off('click');
		$("#raterev").attr("disabled", "disabled").off('click');
	    validationNumber = 3;
	    $('#submitCompetenciesBtn').prop("disabled","true");
		$('#submitCompetenciesBtn').css({"cursor":"not-allowed"});
		$('#saveCompetenciesBtn').prop("disabled","true");
		$('#saveCompetenciesBtn').css({"cursor":"not-allowed"});
	}
	
	
	
	else if(((CurrentDate<SelfApprStartDate)||(CurrentDate>RevApprEndDate))){
		disableAllFields();
		tosterValidation(false);
	    $("#rateemp").attr("disabled", "disabled").off('click');
	    $("#rateappr").attr("disabled", "disabled").off('click');
		$("#raterev").attr("disabled", "disabled").off('click');
	    validationNumber = 3;
	    $('#submitCompetenciesBtn').prop("disabled","true");
		$('#submitCompetenciesBtn').css({"cursor":"not-allowed"});
		$('#saveCompetenciesBtn').prop("disabled","true");
		$('#saveCompetenciesBtn').css({"cursor":"not-allowed"});
	}
	else{
		disableAllFields();
		tosterValidation(false);
	    $("#rateemp").attr("disabled", "disabled").off('click');
	    $("#rateappr").attr("disabled", "disabled").off('click');
		$("#raterev").attr("disabled", "disabled").off('click');
	    validationNumber = 3;
	    $('#submitCompetenciesBtn').prop("disabled","true");
		$('#submitCompetenciesBtn').css({"cursor":"not-allowed"});
		$('#saveCompetenciesBtn').prop("disabled","true");
		$('#saveCompetenciesBtn').css({"cursor":"not-allowed"});
	}
	
}


function checkCredibiltyOfValidationsOnModalBox(validationNumber){
	debugger
   var isVerifiedFlag = null;
   if(validationNumber == "0"){
	   isVerifiedFlag = reverifyAllTheValidationForEmployee();
   }
   if(validationNumber == "1"){
	   isVerifiedFlag = reverifyAllTheValidationForAppraiser();
   }
   if(validationNumber == "2"){
	   isVerifiedFlag = reverifyAllTheValidationForReviewer();
   }
   if(validationNumber == "3"){
	   isVerifiedFlag = reverifyAllTheValidationForAll();
   }
   return isVerifiedFlag;
}

function reverifyAllTheValidationForEmployee(){
	debugger
	var verifiedFlag = false;
	var cond1 = $('#appr_dropdown').prop('disabled');
	var cond2 = $('#appr_remarks').prop('disabled');
	var cond3 = $('#rev_dropdown').prop('disabled');
	var cond4 = $('#rev_remarks').prop('disabled');
	if(cond1 && cond2 && cond3 && cond4){
		verifiedFlag = true;
	}
	return verifiedFlag;
}

function reverifyAllTheValidationForAppraiser(){
	debugger
	var verifiedFlag = false;
	var cond1 = $('#emp_dropdown').prop('disabled');
	var cond2 = $('#emp_remarks').prop('disabled');
	var cond3 = $('#rev_dropdown').prop('disabled');
	var cond4 = $('#rev_remarks').prop('disabled');
	if(cond1 && cond2 && cond3 && cond4){
		verifiedFlag = true;
	}
	return verifiedFlag;
}


function reverifyAllTheValidationForReviewer(){
	debugger
	var verifiedFlag = false;
	var cond1 = $('#appr_dropdown').prop('disabled');
	var cond2 = $('#appr_remarks').prop('disabled');
	var cond3 = $('#emp_dropdown').prop('disabled');
	var cond4 = $('#emp_remarks').prop('disabled');
	if(cond1 && cond2 && cond3 && cond4){
		verifiedFlag = true;
	}
	return verifiedFlag;
}

function reverifyAllTheValidationForAll(){
	debugger
	var verifiedFlag = false;
	var cond1 = $('#appr_dropdown').prop('disabled');
	var cond2 = $('#appr_remarks').prop('disabled');
	var cond3 = $('#rev_dropdown').prop('disabled');
	var cond4 = $('#rev_remarks').prop('disabled');
	var cond5 = $('#emp_dropdown').prop('disabled');
	var cond6 = $('#emp_remarks').prop('disabled');
	if(cond1 && cond2 && cond3 && cond4 && cond5 && cond6){
		verifiedFlag = true;
	}
	return verifiedFlag;
}

function enableEmployeeFields(){
	debugger
	$('#appr_dropdown').prop('disabled','true');
	$('#appr_remarks').prop('disabled','true');
	$('#rev_remarks').prop('disabled','true');
	$('#rev_dropdown').prop('disabled','true');
	$('#rev_dropdown').css({"cursor":"not-allowed"});
	$('#appr_dropdown').css({"cursor":"not-allowed"});
	$('#appraiserName').css({"color": "rgba(0, 0, 0, 0.3)"});
	$('#reviewerName').css({"color": "rgba(0, 0, 0, 0.3)"});
	$('#modal_appr_sec').css({"color":"#999"});
	$('#modal_rev_sec').css({"color":"#999"});
}

function enableAppraiserFields(){
	debugger
	$('#emp_dropdown').prop('disabled','true');
	$('#emp_remarks').prop('disabled','true');
	$('#rev_remarks').prop('disabled','true');
	$('#rev_dropdown').prop('disabled','true');
	$('#rev_dropdown').css({"cursor":"not-allowed"});
	$('#emp_dropdown').css({"cursor":"not-allowed"});
	$('#associateName').css({"color": "rgba(0, 0, 0, 0.3)"});
	$('#reviewerName').css({"color": "rgba(0, 0, 0, 0.3)"});
	$('#modal_emp_sec').css({"color":"#999"});
	$('#modal_rev_sec').css({"color":"#999"});
}

function enableReviewerFields(){
	debugger
	$('#appr_dropdown').prop('disabled','true');
	$('#appr_remarks').prop('disabled','true');
	$('#emp_dropdown').prop('disabled','true');
	$('#emp_remarks').prop('disabled','true');
	$('#appr_dropdown').css({"cursor":"not-allowed"});
	$('#emp_dropdown').css({"cursor":"not-allowed"});
	$('#associateName').css({"color": "rgba(0, 0, 0, 0.3)"});
	$('#appraiserName').css({"color": "rgba(0, 0, 0, 0.3)"});
	$('#modal_emp_sec').css({"color":"#999"});
	$('#modal_appr_sec').css({"color":"#999"});
}

function disableAllFields(){
	debugger
	$('#appr_dropdown').prop('disabled','true');
	$('#appr_remarks').prop('disabled','true');
	$('#emp_dropdown').prop('disabled','true');
	$('#emp_remarks').prop('disabled','true');
	$('#rev_remarks').prop('disabled','true');
	$('#rev_dropdown').prop('disabled','true');
	$('#rev_dropdown').css({"cursor":"not-allowed"});
	$('#appr_dropdown').css({"cursor":"not-allowed"});
	$('#emp_dropdown').css({"cursor":"not-allowed"});
	$('#associateName').css({"color": "rgba(0, 0, 0, 0.3)"});
	$('#appraiserName').css({"color": "rgba(0, 0, 0, 0.3)"});
	$('#reviewerName').css({"color": "rgba(0, 0, 0, 0.3)"});
	$('#modal_emp_sec').css({"color":"#999"});
	$('#modal_appr_sec').css({"color":"#999"});
	$('#modal_rev_sec').css({"color":"#999"});
}


function enableAllFields(){
	debugger
	$('#appr_dropdown').prop('disabled',true);
	$('#appr_remarks').prop('disabled',false);
	$('#emp_dropdown').prop('disabled',true);
	$('#emp_remarks').prop('disabled',false);
	$('#rev_remarks').prop('disabled',false);
	$('#rev_dropdown').prop('disabled',true);
	$('#rev_dropdown').css({"cursor":"pointer"});
	$('#appr_dropdown').css({"cursor":"pointer"});
	$('#emp_dropdown').css({"cursor":"pointer"});
	$('#associateName').css({"color": "#000000"});
	$('#appraiserName').css({"color": "#000000"});
	$('#reviewerName').css({"color": "#000000"});
	$('#modal_emp_sec').css({"color":"#000000"});
	$('#modal_appr_sec').css({"color":"#000000"});
	$('#modal_rev_sec').css({"color":"#000000"});
}

function validationsOnSubmit(){
	debugger
	
	var userrole = getUserRole();
	var status = getStatusOfTeamMember();
	var isFinalized = apprCycle.isFinalized;
	if((userrole == "ESS" || userrole == "Appraiser" || userrole == "Reviewer") && currentPhase > 1 && (teamMemberId == null ||  teamMemberId == "")){
		$('#submitCompetenciesBtn').prop("disabled","true");
		$('#submitCompetenciesBtn').css({"cursor":"not-allowed"});
		$('#saveCompetenciesBtn').prop("disabled","true");
		$('#saveCompetenciesBtn').css({"cursor":"not-allowed"});
	}
	if(teamMemberId != null && teamMemberId != "" && userrole == "Appraiser" && currentPhase > 2){
		$('#submitCompetenciesBtn').prop("disabled","true");
		$('#submitCompetenciesBtn').css({"cursor":"not-allowed"});
		$('#saveCompetenciesBtn').prop("disabled","true");
		$('#saveCompetenciesBtn').css({"cursor":"not-allowed"});
	}
	if(isFinalized=="isFinished"){
		$('#submitCompetenciesBtn').prop("disabled","true");
		$('#submitCompetenciesBtn').css({"cursor":"not-allowed"});
		$('#saveCompetenciesBtn').prop("disabled","true");
		$('#saveCompetenciesBtn').css({"cursor":"not-allowed"});
	}
	if(isFinalized=="isFinished" && currentPhase ==3 && (status=="" || status=="Completed") )
		{
		  removeSubmitButton();
		}
	setValidations();
	return true;
}

function removeSubmitButton(){
	debugger
	if(currentPhase="3"){$("#submitCompetenciesBtn").hide();
	$("#saveCompetenciesBtn").html('submit')}
	}

function saveAsDraft(){
	var response = confirm('Are you sure you want to save ?');
	var status = getStatusOfTeamMember();
	if(response==true){
		saveCompetencies(status);
		location.reload(true);	
	}
	else if(response==false){	
	}
}

function submitCompetencies(){
	console.log("1");
	var response = confirm('Are you sure you want to submit?');
	saveBeforeUpdate();
	console.log("2");
	var status = getStatusOfTeamMember();
	var loopcount = 0;
	var sectionMap = competencyCache.getSectionAndQuestions();
	if(sectionMap != undefined && sectionMap != null && !jQuery.isEmptyObject(sectionMap)){
		outerloop:
		for(var section in sectionMap){
			loopcount++;
			console.log("loopcount="+loopcount);
			if(currentPhase==1){
				if(section != "Overview")
				{
					for(var i=0; i<Object.values(competencyCache.sectionMap[section]).length; i++){
						if((Object.values(competencyCache.sectionMap[section])[i][1]!=null)&&(Object.values(competencyCache.sectionMap[section])[i][4]!=0))
							{
							isFilledObjective=true;
							}
						else
							{
						isFilledObjective=false;
							break outerloop;
							}
					}
				}
				else
				{
				for(var i=0; i<Object.values(competencyCache.sectionMap[section]).length; i++){
					if((Object.values(competencyCache.sectionMap[section])[i][1]!=null))
						{
						isFilledSubjective=true;
						}
				else
						{
						isFilledSubjective=false;
						break outerloop;
						}
				}
				}
			}
			
			if(currentPhase==2){
			if(section != "Overview")
				{
				for(var i=0; i<Object.values(competencyCache.sectionMap[section]).length; i++){
					if((Object.values(competencyCache.sectionMap[section])[i][2]!=null)&&(Object.values(competencyCache.sectionMap[section])[i][5]!=0))
						{
						isFilledObjective=true;
						}
					else
						{
						isFilledObjective=false;
							break outerloop;
						}
					}
					}
			else{
				for(var i=0; i<Object.values(competencyCache.sectionMap[section]).length; i++){
					if((Object.values(competencyCache.sectionMap[section])[i][2]!=null))
						{
						isFilledSubjective=true;
						}
				else
						{
						isFilledSubjective=false;
						break outerloop;
						}
				}
			}
		}
			if(currentPhase==3){
			if(section != "Overview")
				{
				for(var i=0; i<Object.values(competencyCache.sectionMap[section]).length; i++){
					if((Object.values(competencyCache.sectionMap[section])[i][3]!=null)&&(Object.values(competencyCache.sectionMap[section])[i][6]!=0))
						{
						isFilledObjective=true;
						isFilledSubjective=true;
						}
					else
						{
						isFilledObjective=false;
							break outerloop;
						}
				}
				}
			}
		
				}
	
	}
	console.log("Loop completed");
	
	if(response && (isFilledSubjective==true && isFilledObjective== true)){
		console.log("updateCompetencies -- Start");
	var isUpdated = updateCompetencies(status);
	console.log("updateCompetencies -- End isUpdated="+isUpdated);
	sendMailToAppraiser(); // TODO mail send to self and appraiser after
	// filling self assessment.
	sessionStorage.clear();
	window.location.reload(true); // for reloading page
	}
	else if(response==false){	
	}
	else{
		showToster('Warning !', "Please fill out complete form.", 5, "warning");
	}
		}
		
		
		
function setValidationsForSWBox(){
	debugger
	enableAllSW();
	var isFinalized = apprCycle.isFinalized;
	var userrole = getUserRole();
	if(currentPhase == 1){
		disableSWForAppraiser();
	}
	if(currentPhase == 2 ){
		disableSWForEmployee();
	}
	if(currentPhase == 3 || isFinalized=="isFinished"||(currentPhase == 2 && teamMemberId==undefined)||(userrole == "ESS" && currentPhase > 1)){
		disableSWForAppraiser();
		disableSWForEmployee();
		
	}
}

function disableSWForAppraiser(){
	debugger
	$('#appr_SW1').prop("disabled","true");
	$('#appr_SW1').css({"cursor":"not-allowed"});
	$('#appr_SW2').prop("disabled","true");
	$('#appr_SW2').css({"cursor":"not-allowed"});
	$('#appr_SW3').prop("disabled","true");
	$('#appr_SW3').css({"cursor":"not-allowed"});
	$('#modal_appr_sec_sw').css({"color":"#999"});
}
function disableSWForEmployee(){
	debugger
	$('#emp_SW1').prop("disabled","true");
	$('#emp_SW1').css({"cursor":"not-allowed"});
	$('#emp_SW2').prop("disabled","true");
	$('#emp_SW2').css({"cursor":"not-allowed"});
	$('#emp_SW3').prop("disabled","true");
	$('#emp_SW3').css({"cursor":"not-allowed"});
	$('#modal_emp_sec_sw').css({"color":"#999"});
}
function enableAllSW(){
	debugger
	$('#modal_appr_sec_sw').css({"color":"#000000"});
	$('#modal_emp_sec_sw').css({"color":"#000000"});
	$('#emp_SW1').removeAttr('disabled');
	$('#emp_SW1').css({"cursor":"auto"});
	$('#emp_SW2').removeAttr('disabled');
	$('#emp_SW2').css({"cursor":"auto"});
	$('#emp_SW3').removeAttr('disabled');
	$('#emp_SW3').css({"cursor":"auto"});
	$('#appr_SW1').removeAttr('disabled');
	$('#appr_SW1').css({"cursor":"auto"});
	$('#appr_SW2').removeAttr('disabled');
	$('#appr_SW2').css({"cursor":"auto"});
	$('#appr_SW3').removeAttr('disabled');
	$('#appr_SW3').css({"cursor":"auto"});
}

function readMoreFunction(empRemarksLabel,mngRemarksLabel,empRemarks,mngRemarks)
{
	debugger
  if(empRemarks != ""&&empRemarks!=null)
  {
	  if(empRemarks.length>=20)
		  {
			  var minEmpRemarks = empRemarks.substring(0,20)+"...<span id='readMoreEmp' data-toggle='modal' data-target='#myModal' style='cursor:pointer;font-weight:600'>Read More</span>";
			  empRemarksLabel.html(minEmpRemarks);
			  $("#popuplabelemptext").html("");
			  $("#popuplabelemptext").html(empRemarks);
		}
	else
		{
		empRemarksLabel.html(empRemarks);
		}

	}
	if(mngRemarks != ""&&mngRemarks!=null)
	{
		if(mngRemarks.length>=20)
		{
			var minMngRemarks = mngRemarks.substring(0,20)+"...<span id='readMoreAppr'data-toggle='modal' data-target='#myModal' style='cursor:pointer;font-weight:600'>Read More</span>";
			mngRemarksLabel.html(minMngRemarks);
			$("#popuplabelemptext").html("");
			$("#popuplabelemptext").html(mngRemarks);
		}
	else{
		mngRemarksLabel.html(mngRemarks);
		}
	  }
	}

function getStatusOfTeamMember(){
	debugger	
	if(myTeamDataMap != undefined && myTeamDataMap != null && !jQuery.isEmptyObject(myTeamDataMap)){
	for(var empId in myTeamDataMap){
	var teamDataJson = myTeamDataMap[empId];
	status = teamDataJson["status"];
	this.empStatusObject[empId] = status;
	}
	}if(this.empStatusObject[currentEmpId]==undefined){
		return this.selfStatus 
	}else{
	return this.empStatusObject[currentEmpId];
	}
}

function tosterValidation(boolean){
	debugger
	  this.booleanForToster = boolean;
	}

function checkSelfFormIsFilled(){
	debugger
	var checkSelfFormIsFilledFlag = null;
	if(empStatusObject.self=="Self Assessment - pending"&&isDriectorFlag!=true){
	checkSelfFormIsFilledFlag = true;
	}
	else{
	checkSelfFormIsFilledFlag = false;
	}
	return checkSelfFormIsFilledFlag;
	}

	
function removeSubmitButton(teamDataJson){
	debugger
	  if((currentPhase=="3"))
	  {
	     $("#submitCompetenciesBtn").hide();
	     $("#saveCompetenciesBtn").html('Submit');
	     tosterValidation(false);
	     $("#saveCompetenciesBtn").prop("disabled", false);
	     $("#saveCompetenciesBtn").css("cursor","pointer");
	  }
	  }