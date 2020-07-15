<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
  <title>Dashboard</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <META Http-Equiv="Cache-Control" Content="no-cache"/>
  <META Http-Equiv="Pragma" Content="no-cache"/>
  <META Http-Equiv="Expires" Content="0"/>
  <link rel="icon" href="<c:url value='/common/favicon.png'/>" type="image/png"/>
  <link rel="stylesheet" href="<c:url value='/lib/jquery/jqueryUI/jquery-ui.min.css'/>">	
  <link rel="stylesheet" href="<c:url value='/lib/bootstrap-3.3.7/css/bootstrap.css'/>" />
  <link rel="stylesheet" href="<c:url value='/lib/font-awesome/css/font-awesome.min.css'/>" />
  <link rel="stylesheet" href="<c:url value='/lib/jquery/loading/showLoading.css'/>" />
  <link rel="stylesheet" href="<c:url value='/lib/toaster/toastr.min.css'/>" />
  <link rel="stylesheet" href="<c:url value='/lib/bootstrap-datepicker/datepicker.css'/>" />
  <link rel="stylesheet" href="<c:url value='/lib/select2/css/select2.css'/>" />
  <link rel="stylesheet" href="<c:url value='/lib/summernote/summernote.css'/>" />
  <link rel="stylesheet" href="<c:url value='/lib/summernote/summernote-bs3.css'/>" />	
  <link rel="stylesheet" href="<c:url value='/lib/jquery/dataTable/jquery.dataTables.css'/>" />	
   <link rel="stylesheet" href="<c:url value='/lib/jquery/dataTable/dataTables.checkboxes.css'/>" />	
  <link rel="stylesheet" href="<c:url value='/lib/jquery/multiselect/bootstrap-multiselect.css'/>" />	
  <linl rel="stylesheet" href="<c:url value='/WEB-INF/login/css/masterpagestyle.css'/>"/>  
  <link rel="stylesheet" href="<c:url value='/lib/rater/rateremp.css'/>"/>
  <link rel="stylesheet" href="<c:url value='/lib/rater/raterappr.css'/>"/>
  <link rel="stylesheet" href="<c:url value='/lib/rater/raterrev.css'/>"/>
  <link href="https://fonts.googleapis.com/css?family=Nunito+Sans" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  
  
  <style><%@include file="/WEB-INF/login/css/masterpagestyle.css"%></style>
  
  <script type="text/javascript" src="<c:url value='/lib/jquery/dataTable/jquery-3.3.js'/>"></script>
  <script type="text/javascript" src="<c:url value='/lib/jquery/jqueryUI/jquery-ui.min.js'/>"></script>
  <script type="text/javascript" src="<c:url value='/lib/bootstrap-3.3.7/js/bootstrap.min.js'/>"></script>
  <script type="text/javascript" src="<c:url value='/lib/bootstrap-datepicker/bootstrap-datepicker.js'/>"></script>
  <script type="text/javascript" src="<c:url value='/lib/jquery/loading/jquery.showLoading.js'/>"></script>
  <script type="text/javascript" src="<c:url value='/lib/toaster/toastr.min.js'/>"></script>
  <script type="text/javascript" src="<c:url value='/lib/moment/moment.min.js'/>"></script>
  <script type="text/javascript" src="<c:url value='/lib/summernote/summernote.min.js'/>"></script>
  <script type="text/javascript" src="<c:url value='/lib/select2/js/select2.min.js'/>"></script>
  <script type="text/javascript" src="<c:url value='/competency/competency.js'/>"></script>
  <script type="text/javascript" src="<c:url value='/admin/adminPanel.js'/>"></script>
  <script type="text/javascript" src="<c:url value='/lib/jquery/dataTable/jquery.dataTables.min.js'/>"></script>
  <script type="text/javascript" src="<c:url value='/lib/jquery/dataTable/dataTables.checkboxes.min.js'/>"></script>
  <script type="text/javascript" src="<c:url value='/lib/jquery/multiselect/bootstrap-multiselect.min.js'/>"></script>
  <script type="text/javascript" src="<c:url value='/lib/jquery/multiselect/popper.js'/>"></script>
  <script type="text/javascript" src="<c:url value='/lib/rater/rateremp.js'/>"></script>
  <script type="text/javascript" src="<c:url value='/lib/rater/customrateremp.js'/>"></script>
  <script type="text/javascript" src="<c:url value='/lib/rater/raterappr.js'/>"></script>
  <script type="text/javascript" src="<c:url value='/lib/rater/customraterappr.js'/>"></script>
  <script type="text/javascript" src="<c:url value='/lib/rater/raterrev.js'/>"></script>
  <script type="text/javascript" src="<c:url value='/lib/rater/customraterrev.js'/>"></script>
  <script type="text/javascript" src="<c:url value='/lib/Export/table2excel.js'/>"></script>
  <%-- <script type="text/javascript" src="<c:url value='/lib/chart/canvasjs.min.js'/>"></script>
   --%>
  <style><%@include file="/WEB-INF/login/css/masterpagestyle.css"%></style>
  
</head>
<style>
::-webkit-input-placeholder { /* Webkit */
    line-height:60px;
    color:#CECECE
}
textarea {
    border: none;
    background-color: transparent;
    resize: none;
    outline: none;
    -webkit-box-shadow: none;
}

#saveSW
{
background-color: white; /* Green */
  color: #3A97D3;
  padding: 9px 40px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  font-weight:bold;
  font-family: Lato;
  margin: 8px 38px;
  transition-duration: 0.6s;
  cursor: pointer;
   border: 1px solid #3A97D3;

}

#saveSW:hover{
 background-color:#3A97D3;
 color: white;
}
#saveAndContinueBtn{
background-color: white; /* Green */
  color: #3A97D3;
  padding: 9px 40px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  font-weight:bold;
  font-family: Lato;
  margin: 8px 38px;
  transition-duration: 0.6s;
  cursor: pointer;
   border: 1px solid #3A97D3;
}

#saveAndContinueBtn:hover{
 background-color:#3A97D3;
 color: white;
}
</style>

<style>
@media (min-width: 992px) {
 .container-scroll {
   overflow-x: auto;
 }
 .container-scroll > .row {
   width: 133.33333333%; /* = 100% * 4/3 */
 }
}</style>
<body style="font-family:Segoe UI !important;height:100% !important;background:#F6F6F6;">

	<div class="row" style="background:#f8f8f8;margin-left:0px;margin-right:0px;">
		 <div class="col-sm-7">	
			<img src="images/third-i-logo-color.png"  style="padding: 2.2% 1.2% 2% 3%; width:20%;height:auto;" alt="ThirdI Logo">
		</div>
		 <div class="col-sm-5 pull-right" style="margin-bottom:0.5%;background-color:#f8f8f8;">
		   <label class="pull-right" style="color:#9A9A9A;margin-top:3.5%;text-align:right;font-size:14px;font-weight:300;padding-right:4%;font-family:Nunito Sans;">Welcome, <label id="username" style="color:#9A9A9A;font-family:Nunito Sans;font-weight:300;font-size:14px;">User</label>
		   <img src="images/usercustom.png" style="width:8%;border-radius:100%;margin-left:4%;"></img>
		   
		   <a id="adminDashboardLink" onclick="showAdminDashboard()"><img src="images/admin-icon.svg" title="Admin Panel" style="cursor: pointer;height:20px;width:20px;margin-left: 15px;"></img>
		   <a href="<c:url value='/j_spring_security_logout' />"><img src="images/logout-icon.svg" title="Logout" style="cursor: pointer;height: 20px;width: 20px;margin-left: 15px;"></img>
		</div>
	</div>
	<div id="userDashboard" class="col-sm-12" style="margin-top:0%;background:#f1f1f1; background-position: center;background-repeat: no-repeat; background-size: cover;height: 100%">
		<div class="col-sm-1 sidebar-collapse" style="max-height: 100%;height: 762px;padding-left:0px;padding-right:0px;width: 80px;margin-left: 0px;margin-right: 0px;" id="sideDiv">
		<span><br><br><br><br><br><br><br></span>
			<ul id="menubar" class="nav nav-pills nav-stacked">
					
					<li id="dashboard"  onclick="showDashboard()" data-toggle="tooltip" data-placement="right" ><a href="#tab2"  style="padding:5% 0% 5% 15%;margin:7%;"><img id="dashboardImage" src="images/Analytics-icon-blue.svg" alt="" title="Dashboard" style="width:60%;"></img></a></li>
					<li id="competency" data-toggle="tooltip" data-placement="right" onclick="showCompetencies('')"><a href="#tab4" style="padding:35% 0% 25% 15%;margin:12%;"><img id="myformImage" src="images/Document-icon.svg" alt="" title="My Form" style="width:60%;"></img></a></li>
			</ul>	
		</div>
		<div class="col-sm-11" style="padding-top: 2%;">
			<!-- <div class="col-sm-12" style="margin-top:2%;">
				<div class="col-sm-3">
					<span class="col-sm-12" style="margin-top:1%;"></span>
					<span class="col-sm-12" style="margin-top:1%;font-weight:600"></span>
				</div> -->
			<div style="width: 100%;">
				<div class="col-sm-3" style="width: 32%;">
					<span class="col-sm-12 selfAssess"
						style="margin-top: 1%; color: #9A9A9A; font-family:" NunitoSans";">
						Self Assessment </span> <span id="selfAssessmentED" class="col-sm-12"></span>
				</div>
			<!-- <div class="col-sm-3" style="width: 20%";>
					<span class="col-sm-12 apprAssess"
						style="margin-top: 1%; color: #9A9A9A; font-family:" NunitoSans";">Appraiser
						Assessment</span> <span id="apprAssessmentED" class="col-sm-12">
					</span>
				</div>
				<div class="col-sm-3" style="width: 20%;">
					<span class="col-sm-12 revAssess"
						style="margin-top: 1%; color: #9A9A9A; font-family:" NunitoSans";">Reviewer
						Assessment</span> <span id="revAssessmentED" class="col-sm-12"></span>
				</div> -->
		</div>
			<div class="col-sm-12">
				<span><br></span>
			</div>
		<!--  <div class='col-sm-12' style="margin-left: 1%">
				<span id="ball1" class="col-sm-1 balldot"></span>
				<hr id="line1" class="col-sm-3">
				<span id="ball2" class="col-sm-1 balldot"></span>
				<hr id="line2" class="col-sm-3">
				<span id="ball3" class="col-sm-1 balldot"></span>
				<hr id="line3" class="col-sm-3">
			</div>  -->
			<div class="col-sm-12" id="headerOfFullContentDiv"
				style="padding-top: 1%; padding-bottom: 0.5%;"></div>
			<div class="col-sm-12" id="fullContentDiv" style="margin-bottom: 5%;"></div>
			<div class="modal fade" id="myModal" role="dialog" >
				<div class="modal-dialog" style="width:350px">

					<!-- Modal content-->
					<div class="modal-content">
						<div class="">
							<button type="button" class="close" data-dismiss="modal">&times;</button>
							<h4 class="modal-title" style="font-family:Nunito Sans;color:#3A97D3;">Comment</h4>
						</div>
						<div class="modal-body">
							<p id="popuplabelemptext" style="word-wrap:break-word;font-family:Nunito Sans;"></p>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default"
								data-dismiss="modal">Close</button>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</div>

<div id="adminDashboard" class="col-sm-12" style="margin-top:0%;background:#f7f7f7;display:none;">
		<div class="col-sm-12" style="margin-top:1%;margin-bottom:2%;">
			    <div id="crossAndBack" class="row" style="margin-bottom:1%;">
					    <button onclick="showUserDashboard(), window.location.reload(true);" class="btn btn-circle btn-close pull-right" style="margin-left:1%;" data-toggle="tooltip" data-placement="bottom" title="Close">
							<i class="fa fa-times" style="margin-right:1%;font-size:13px;"></i>
					    </button>
						<button onclick="backToDashboard();" class="btn btn-circle btn-close pull-right" style="margin-left:1%;" data-toggle="tooltip" data-placement="bottom" title="Back">
							<i class="fa fa-mail-reply-all" style="margin-right:1%;font-size:11px;"></i>
					    </button>
				</div>
			    <div class="row" id="adminDashboardHeader" style="padding-top:1%;padding-bottom:1%;background:white;">
			    	 	<div class="col-sm-1" style="padding-top:2%;"> 
			    	 		<i class="fa fa-crosshairs fa-3x fa-fw" style="cursor:pointer;color:#18A689;" onclick="backToDashboard()"></i>
			    	 	</div>
			    	 	<div class="col-sm-10">
			    	 		<label style="width:100%;"><h2 id="currentCycleName">Performance Review Cycle April-2018</h2></label>
			    	 		<label class="label label-warning" id="durationOfCycleSD" style="width:20%;background-color:#18A689"> NA  </label>
			    	 			<label class="label label-default" style="width:5%;">to</label>
			    	 		<label class="label label-warning" id="durationOfCycleED" style="width:20%;background-color:#18A689"> NA  </label>	
			    	 	</div>
			    	 	<div class="col-sm-1" style="padding-top:4%;text-align:center;"> 
			    	 		<h2 class="label label-warning" id="totalCycles" style="width:100%;font-size:16px;background-color:#18A689;">1</h2>
			    	 	    <label style="width:100%;float:none;font-size:12px; font-weight:500;color:#999999;text-align:center;">cycles</label>
			    	 	</div>
			    </div>
				<div class="row" id="actionContainer">
					    <div class="col-sm-12" style="text-align:left;padding-top:3%;padding-bottom:1%;background:white;margin-top:0px;padding-left:3%;font-weight:600;font-size:15px;"> 
					    		Avail Actions
					    </div>
						<div class="col-sm-12" id="createNewCycle" onclick="createNewCycle()" style="cursor:pointer;padding-top:1%;padding-bottom:2%;border-bottom:1px solid #eeeeee;background:white">
								<div class="col-sm-1" style="width:5% !important;cursor:pointer">
									<i class="fa fa-plus fa-2x" style="color:#18A689;"></i>
								</div>
								<div class="col-sm-10">
									<label style="width:100%;float:none;font-size:14px; font-weight:600;cursor:pointer" onclick="CycleNameCheck();">Create Cycle</label>
									<label style="width:100%;float:none;font-size:12px; font-weight:500;color:#999999;cursor:pointer">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</label>
								</div>
								<div class="col-sm-1" style="text-align:right;padding:1% 0 1% 0;">
									 <i class="fa fa-arrow-right fa-2x" style="color:#18A689;cursor:pointer"></i>
								</div>
						</div>
						<div class="col-sm-12" id="updateDates" onclick="extendDates()" style="cursor:pointer;padding-top:1%;padding-bottom:2%;border-bottom:1px solid #eeeeee;background:white">
								<div class="col-sm-1" style="width:5% !important;cursor:pointer">
									<i class="fa fa-plus fa-2x" style="color:#18A689;"></i>
								</div>
								<div class="col-sm-10">
									<label style="width:100%;float:none;font-size:14px; font-weight:600;cursor:pointer">Extend Dates</label>
									<label style="width:100%;float:none;font-size:12px; font-weight:500;color:#999999;cursor:pointer">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</label>
								</div>
								<div class="col-sm-1" style="text-align:right;padding:1% 0 1% 0;">
									 <i class="fa fa-arrow-right fa-2x" style="color:#18A689;cursor:pointer"></i>
								</div>
						</div>
						<div class="col-sm-12" id="showEmployeeProgressView" onclick="showEmployeeProgressView()" style="cursor:pointer;padding-top:1%;padding-bottom:2%;border-bottom:1px solid #eeeeee;background:white">
								<div class="col-sm-1" style="width:5% !important;cursor:pointer;">
									<i class="fa fa-line-chart fa-2x" style="color:#18A689;"></i>
								</div>
								<div class="col-sm-10">
									<label style="cursor:pointer;width:100%;float:none;font-size:14px; font-weight:600;">View Progress</label>
									 <label style="cursor:pointer;width:100%;float:none;font-size:12px; font-weight:500;color:#999999;">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</label>
								</div>
								<div class="col-sm-1" style="text-align:right;padding:1% 0 1% 0;">
									 <i class="fa fa-arrow-right fa-2x" style="color:#18A689;cursor:pointer;"></i>
								</div>
						</div>
						<div class="col-sm-12" id="generateEmployeeMetricSheet" onclick="generateEmployeeMetricSheet()" style="cursor:pointer;padding-top:1%;padding-bottom:2%;border-bottom:1px solid #eeeeee;background:white">
								<div class="col-sm-1" style="width:5% !important;">
									<i class="fa fa-file-text-o fa-2x" style="color:#18A689;"></i>
								</div>
								<div class="col-sm-10">
									<label style="cursor:pointer;width:100%;float:none;font-size:14px; font-weight:600;">Employee Metric Sheet</label>
									 <label style="cursor:pointer;width:100%;float:none;font-size:12px; font-weight:500;color:#999999;">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</label>
								</div>
								<div class="col-sm-1" style="text-align:right;padding:1% 0 1% 0;">
									 <i class="fa fa-arrow-right fa-2x" style="color:#18A689;cursor:pointer;"></i>
								</div>
						</div>
						
					
					<div class="col-sm-12" id="mapHRAdminForReviewerLevel2View" onclick="mapHRAdminForReviewerLevel2View()" style="cursor:pointer;padding-top:1%;padding-bottom:2%;border-bottom:1px solid #eeeeee;background:white">
								<div class="col-sm-1" style="width:5% !important;">
									<i class="fa fa-user fa-2x" style="color:#18A689;"></i>
								</div>
								<div class="col-sm-10">
									<label style="cursor:pointer;width:100%;float:none;font-size:14px; font-weight:600;">Assign Admin</label>
									 <label style="cursor:pointer;width:100%;float:none;font-size:12px; font-weight:500;color:#999999;">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</label>
								</div>
								<div class="col-sm-1" style="text-align:right;padding:1% 0 1% 0;">
									 <i class="fa fa-arrow-right fa-2x" style="color:#18A689;cursor:pointer;"></i>
								</div>
						</div>	
						<div class="col-sm-12" id="exportdata" onclick="exportdata()" style="cursor:pointer;padding-top:1%;padding-bottom:2%;border-bottom:1px solid #eeeeee;background:white">
								<div class="col-sm-1" style="width:5% !important;">
									<i class="fa fa-user fa-2x" style="color:#18A689;"></i>
								</div>
								<div class="col-sm-10">
									<label style="cursor:pointer;width:100%;float:none;font-size:14px; font-weight:600;"> Export Data</label>
									 <label style="cursor:pointer;width:100%;float:none;font-size:12px; font-weight:500;color:#999999;">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</label>
								</div>
								<div class="col-sm-1" style="text-align:right;padding:1% 0 1% 0;">
									 <i class="fa fa-arrow-right fa-2x" style="color:#18A689;cursor:pointer;"></i>
								</div>
						</div>	
						
					<!-- 	<div class="col-sm-12" id="mapEmployeeWithReviewerView" onclick="mapEmployeeWithReviewerView()" style="cursor:pointer;padding-top:1%;padding-bottom:2%;border-bottom:1px solid #eeeeee;background:white">
								<div class="col-sm-1" style="width:5% !important;">
									<i class="fa fa-users fa-2x" style="color:#18A689;"></i>
								</div>
								<div class="col-sm-10">
									<label style="cursor:pointer;width:100%;float:none;font-size:14px; font-weight:600;">Assign Reviewer</label>
									<label style="cursor:pointer;width:100%;float:none;font-size:12px; font-weight:500;color:#999999;">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</label>
								</div>
								<div class="col-sm-1" style="text-align:right;padding:1% 0 1% 0;">
									 <i class="fa fa-arrow-right fa-2x" style="color:#18A689;cursor:pointer;"></i>
								</div>
						</div> -->
						
						
						
					<!-- 	<div class="col-sm-12" id="mapHRAdminForReviewerLevel2View" onclick="mapHRAdminForReviewerLevel2View()" style="cursor:pointer;padding-top:1%;padding-bottom:2%;border-bottom:1px solid #eeeeee;background:white">
								<div class="col-sm-1" style="width:5% !important;">
									<i class="fa fa-user fa-2x" style="color:#18A689;"></i>
								</div>
								<div class="col-sm-10">
									<label style="cursor:pointer;width:100%;float:none;font-size:14px; font-weight:600;">Assign Admin</label>
									<label style="cursor:pointer;width:100%;float:none;font-size:12px; font-weight:500;color:#999999;">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</label>
								</div>
								<div class="col-sm-1" style="text-align:right;padding:1% 0 1% 0;">
									 <i class="fa fa-arrow-right fa-2x" style="color:#18A689;cursor:pointer;"></i>
								</div>
						</div> -->
				</div>
				
<!------------------------------------------------------------------NEW CYCLE START----------------------------------------------------------------->
				
				<div id="createNewCycelContainer" class="row" style="display:none;margin-bottom:1%;">
					<div class="col-sm-12" style="border:1px soild #EEEEEEE;margin-top:3px;background:white;">
						 <label style="width:90%;padding:1% 0 1% 0%;font-size:18px;"><i class="fa fa-plus" style="padding-left:0%;margin-right:1%;color:#18A689;"></i> Create Cycle</label>
					</div>
					<div class="col-sm-12" style="padding:0.5% 0 0% 0;">
						     <div class="ibox">
						  		  <div class="ibox-title">
				                      <a class="collapse-link" href="" style="color:#000 !important;">
				                      	<label style="width:50%;">
				                      		<label class="label label-success" style="margin-right:2%;background-color:#18A689">1</label> 
				                      		Set title of appraisal cycle
				                      	</label>
				                      </a>
				                      <div class="ibox-tools col-sm-2 pull-right" style="text-align:right;">
				                          <a class="collapse-link" href="">
				                              <i class="fa fa-chevron-up"></i>
				                          </a>
				                      </div>
				                  </div>
				                  <div class="ibox-content" style="">
				                       <input type="text" class="emp_remarks_sw" id="cycle_title"  placeholder="Ex. Performance Review Cycle April-2018"  style="width:95%;margin-top:1%;margin-bottom:1%;resize: vertical;margin-left:2%;float:none;" required>
				                  </div>
				              </div>   
				              <div class="ibox"> 
				                  <div class="ibox-title">
				                      <a class="collapse-link" href="" style="color:#000 !important;">
				                      	<label style="width:50%;">
				                      		<label class="label label-success" style="margin-right:2%;background-color:#18A689">2</label>
				                      		Set duration of appraisal cycle
				                      	</label>
				                      		 <i class="fa fa-refresh" id =clearDates style="margin-left: -401px;" aria-hidden="true"  onclick="ClearDates();"></i>
				                      	
				                      </a>
				                      <div class="ibox-tools col-sm-2 pull-right" style="text-align:right;">
				                          <a class="collapse-link" href="">
				                              <i class="fa fa-chevron-up"></i>
				                          </a>
				                      </div>
				                  </div>
				                  <div class="ibox-content" style="">
				                          <div class="form-group">
												<label class="font-normal">Set Start Date :</label>
												<div data-date="" data-date-format="dd-mm-yyyy" id="cycle_startdate" class="input-group date">
													<span class="input-group-addon"><i class="fa fa-calendar"></i></span>
													<input type="text" readonly placeholder="DD-MM-YYYY" name="cycleStartDate" id="cycleStartDate" size="16" class="form-control" style="width:20%;" required=true> 
												</div>
										  </div>
										  
										  <div class="form-group">
												<label class="font-normal">Set End Date :</label>
												<div data-date="" data-date-format="dd-mm-yyyy" id="cycle_enddate" class="input-group date">
													<span class="input-group-addon"><i class="fa fa-calendar"></i></span>
													<input type="text" readonly placeholder="DD-MM-YYYY" name="cycleEndDate" id="cycleEndDate" size="16" class="form-control" style="width:20%;" required> 
												</div>
										  </div>
				                  </div>
				                </div>
				                <div class="ibox">  
				                  <div class="ibox-title">
				                      <a class="collapse-link" href="" style="color:#000 !important;">
				                      	<label style="width:50%;">
				                      		<label class="label label-success" style="margin-right:2%;background-color:#18A689">3</label> 
				                      		Set duration for self assessment	
				                      	</label>
				                      </a>
				                      <div class="ibox-tools col-sm-2 pull-right" style="text-align:right;">
				                          <a class="collapse-link" href="">
				                              <i class="fa fa-chevron-up"></i>
				                          </a>
				                      </div>
				                  </div>
				                  <div class="ibox-content" style="">
				                          <div class="form-group">
												<label class="font-normal">Set start date for self assessment:</label>
												<div data-date="" data-date-format="dd-mm-yyyy" id="self_ap_startdate" class="input-group date">
													<span class="input-group-addon"><i class="fa fa-calendar"></i></span>
													<input type="text" readonly placeholder="DD-MM-YYYY" name="selfApprStartDate" id="selfApprStartDate" size="16" class="form-control" style="width:20%;" required> 
												</div>
										  </div>
										  <div class="form-group">
												<label class="font-normal">Set end date for self assessment:</label>
												<div data-date="" data-date-format="dd-mm-yyyy" id="self_ap_enddate" class="input-group date">
													<span class="input-group-addon"><i class="fa fa-calendar"></i></span>
													<input type="text" readonly placeholder="DD-MM-YYYY" name="selfApprEndDate" id="selfApprEndDate" size="16" class="form-control" style="width:20%;" required> 
												</div>
										  </div>
				                  </div>
				               </div>
				               <div class="ibox">   
				                  <div class="ibox-title">
				                      <a class="collapse-link" href="" style="color:#000 !important;"><label style="width:50%;"><label class="label label-success" style="margin-right:2%;background-color:#18A689">4</label> Set duration for appraiser assessment</label>
				                      </a>
				                      <div class="ibox-tools col-sm-2 pull-right" style="text-align:right;">
				                          <a class="collapse-link" href="">
				                              <i class="fa fa-chevron-up"></i>
				                          </a>
				                      </div>
				                  </div>
				                  <div class="ibox-content" style="">
				                          <div class="form-group">
												<label class="font-normal">Set start date for appraiser assessment:</label>
												<div data-date="" data-date-format="dd-mm-yyyy" id="mng_ap_startdate" class="input-group date">
													<span class="input-group-addon"><i class="fa fa-calendar"></i></span>
													<input type="text" readonly placeholder="DD-MM-YYYY" name="mngApprStartDate" id="mngApprStartDate" size="16" class="form-control" style="width:20%;" required> 
												</div>
										  </div>
										  <div class="form-group">
												<label class="font-normal">Set end date for appraiser assessment:</label>
												<div data-date="" data-date-format="dd-mm-yyyy" id="mng_ap_enddate" class="input-group date">
													<span class="input-group-addon"><i class="fa fa-calendar"></i></span>
													<input type="text" readonly placeholder="DD-MM-YYYY" name="mngApprEndDate" id="mngApprEndDate" size="16" class="form-control" style="width:20%;" required> 
												</div>
										  </div>
				                  </div>
				               </div>  
				               <div class="ibox"> 
				                  <div class="ibox-title">
				                      <a class="collapse-link" style="color:#000 !important;">
				                      	<label style="width:50%;">
				                      		<label class="label label-success" style="margin-right:2%;background-color:#18A689;">5</label>
				                      		 Set duration of reviewer assessment
				                        </label>
				                      </a>
				                      <div class="ibox-tools col-sm-2 pull-right" style="text-align:right;">
				                          <a class="collapse-link">
				                              <i class="fa fa-chevron-up"></i>
				                          </a>
				                      </div>
				                  </div>
				                  <div class="ibox-content" style="">
				                          <div class="form-group">
												<label class="font-normal">Set start date for reviewer assessment:</label>
												<div data-date="" data-date-format="dd-mm-yyyy" id="rev_ap_startdate" class="input-group date">
													<span class="input-group-addon"><i class="fa fa-calendar"></i></span>
													<input type="text" readonly placeholder="DD-MM-YYYY" name="revApprStartDate" id="revApprStartDate" size="16" class="form-control" style="width:20%;" required> 
												</div>
										  </div>
										  <div class="form-group">
												<label class="font-normal">Set end date for reviewer assessment:</label>
												<div data-date="" data-date-format="dd-mm-yyyy" id="rev_ap_enddate" class="input-group date">
													<span class="input-group-addon"><i class="fa fa-calendar"></i></span>
													<input type="text" readonly placeholder="DD-MM-YYYY" name="revApprEndDate" id="revApprEndDate" size="16" class="form-control" style="width:20%;" required> 
												</div>
										  </div>
				                  </div>
				                </div>  
							</div>
							<div class="row">
								<button  id="CheckMandatoryFields" class="btn btn-outline-green btn-success" style="border-radius:0px !important;margin-left:1%;padding-left:2%;padding-right:2%;">Create</button>
							</div>
				</div>
				
<!------------------------------------------------------------- Extend Dates for Cycle --------------------------------------------------------------->				
					
				
				
				
					<div id="extendDates" class="row" style="display:none;margin-bottom:1%;">
					<div class="col-sm-12" style="border:1px soild #EEEEEEE;margin-top:3px;background:white;">
						 <label style="width:90%;padding:1% 0 1% 0%;font-size:18px;"><i class="fa fa-plus" style="padding-left:0%;margin-right:1%;color:#18A689;"></i> Extend Cycle</label>
					</div>
					<div class="col-sm-12" style="padding:0.5% 0 0% 0;">
						     
				                  <div class="ibox-content" style="">
										  <div class="form-group">
												<label class="font-normal">Set End Date :</label>
												<div data-date="" data-date-format="dd-mm-yyyy" id="extend_cycle_enddate"   class="input-group date">
													<span class="input-group-addon"><i class="fa fa-calendar"></i></span>
													<input type="text" readonly placeholder="DD-MM-YYYY" name="extendCycleEndDate" id="extendCycleEndDate" size="16" class="form-control" style="width:20%;" required> 
												</div>
										  </div>
				                  </div>
				                </div> 
				                <div class="ibox">  
				                  <div class="ibox-title">
				                      <a class="collapse-link" href="" style="color:#000 !important;">
				                      	<label style="width:50%;">
				                      		<label class="label label-success" style="margin-right:2%;background-color:#18A689">3</label> 
				                      		Set duration for self assessment	
				                      	</label>
				                      	 <i class="fa fa-refresh" id ="clearExtendedDates" style="margin-left: -401px;" aria-hidden="true"  onclick="ClearExtendedDates();"></i>
				                      </a>
				                      <div class="ibox-tools col-sm-2 pull-right" style="text-align:right;">
				                          <a class="collapse-link" href="">
				                              <i class="fa fa-chevron-up"></i>
				                          </a>
				                      </div>
				                  </div>
				                  <div class="ibox-content" style="">
				                         
										  <div class="form-group">
												<label class="font-normal">Set end date for self assessment:</label>
												<div data-date="" data-date-format="dd-mm-yyyy" id="extend_self_ap_enddate" class="input-group date">
													<span class="input-group-addon"><i class="fa fa-calendar"></i></span>
													<input type="text" readonly placeholder="DD-MM-YYYY" name="extendSelfApprEndDate" id="extendSelfApprEndDate" size="16" class="form-control" style="width:20%;" required> 
												</div>
										  </div>
				                  </div>
				               </div>
				               <div class="ibox">   
				                  <div class="ibox-title">
				                      <a class="collapse-link" href="" style="color:#000 !important;"><label style="width:50%;"><label class="label label-success" style="margin-right:2%;background-color:#18A689">4</label> Set duration for appraiser assessment</label>
				                      </a>
				                      <div class="ibox-tools col-sm-2 pull-right" style="text-align:right;">
				                          <a class="collapse-link" href="">
				                              <i class="fa fa-chevron-up"></i>
				                          </a>
				                      </div>
				                  </div>
				                  <div class="ibox-content" style="">
				                          
										  <div class="form-group">
												<label class="font-normal">Set end date for appraiser assessment:</label>
												<div data-date="" data-date-format="dd-mm-yyyy" id="extend_mng_ap_enddate" class="input-group date">
													<span class="input-group-addon"><i class="fa fa-calendar"></i></span>
													<input type="text" readonly placeholder="DD-MM-YYYY" name="extendMngApprEndDate" id="extendMngApprEndDate" size="16" class="form-control" style="width:20%;" required> 
												</div>
										  </div>
				                  </div>
				               </div>  
				               <div class="ibox"> 
				                  <div class="ibox-title">
				                      <a class="collapse-link" style="color:#000 !important;">
				                      	<label style="width:50%;">
				                      		<label class="label label-success" style="margin-right:2%;background-color:#18A689;">5</label>
				                      		 Set duration of reviewer assessment
				                        </label>
				                      </a>
				                      <div class="ibox-tools col-sm-2 pull-right" style="text-align:right;">
				                          <a class="collapse-link">
				                              <i class="fa fa-chevron-up"></i>
				                          </a>
				                      </div>
				                  </div>
				                  <div class="ibox-content" style="">
				                        
										  <div class="form-group">
												<label class="font-normal">Set end date for reviewer assessment:</label>
												<div data-date="" data-date-format="dd-mm-yyyy" id="extend_rev_ap_enddate" class="input-group date">
													<span class="input-group-addon"><i class="fa fa-calendar"></i></span>
													<input type="text" readonly placeholder="DD-MM-YYYY" name="extendRevApprEndDate" id="extendRevApprEndDate" size="16" class="form-control" style="width:20%;" required> 
												</div>
										  </div>
				                  </div>
				                </div>  
							</div>
							<div class="row">
								<button  onclick="extendDatesValidations();"  id ="CheckMandatoryFieldsForExtendDates" class="btn btn-outline-green btn-success" style="border-radius:0px !important;margin-left:1%;padding-left:2%;padding-right:2%;">Extend Dates</button>
							</div>
							
				</div>
				<div class="row" id="adminDashboardContentArea" style="background:#fff;margin-top:3px;display:none;padding-top:1%;padding-bottom:1%;"></div>
   
   
   
            

		</div>
</div>



<!------------------------------------------------------------- Admin panel view ends --------------------------------------------------------------->



<!------------------------------------------------------------ Competence modal box starts ------------------------------------------------------------->
 
 
  <div id="remarksAndScoreBox" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display:none; width:80% !important;height:600px !important;overflow-y:inherit !important;">
        <div class="modal-content clearfix" style="padding-bottom:1%;">
        	<div class="modal-header" style="border-bottom:2px solid #d3d5d3 !important;padding:1% !important;">
            <div class="col-sm-12" style="height:55px">
            	<div class="col-sm-7" style="padding-left:0px !important;padding-right:0px !important;">
            			<span class="col-sm-9 pull-left" style="padding-left:0px !important;padding-top:2%; color:#4A4A4A;">
            			<div class="col-sm-11">
            			<p id="sectionLabel" style="color: #4A4A4A;font-family: "Nunito Sans";font-size:;font-weight: 300;height: 30px;width: 95px;"> </p>
            			</div>
            			</span>
            	</div>
            	<div class="col-sm-3 col-sm-push-1">
            	<button id="saveAndContinueBtn" class="pull-right" aria-hidden="true" style="cursor:pointer;margin-right:70px;">Save</button>
            	</div>
            	<div class="col-sm-2" style="padding-right:1% !important;padding-top:0.5%;">
            		<img id="crossImg" class="pull-right" src="images/close-button.png" data-dismiss="modal" aria-hidden="true" style="margin-right:0%;padding-top:1%;cursor:pointer;" onclick="showCompetencies('','null')">
            		<img id="infoImg" class="pull-right" src="images/info-icon.png" style="margin-right:10%;font-size:1.2em !important;padding-top:1%;cursor:pointer;" onclick="viewAndHidePI();">
            	</div>
            </div>
            <br>
             <div class="col-sm-12" id="questionPerSection" >
			             	</div>
        </div>	
        <div class="modal-body">
            <form id="submitCommentsAndScoreForm" style="overflow-y: auto;max-height: 400px;">
				<div class="col-sm-12" style="padding-left:0% !important;">
					<div class="col-sm-9" style="padding-left:0% !important;padding-right: 0px;" id="commentBoxDiv">
						<div class="col-sm-12" style="margin-top:0%;padding-top:2%;padding-bottom:2%;padding-left:0% !important;" id="modal_emp_sec">
							<div class="col-sm-6">
							<label id="questionlabelforinfo" class="pull-left" style="font-weight:400;font-family:Nunito Sans;color: #4A4A4A;"></label>
								<label class="pull-left" id="associateName" style="font-weight:bold;font-family:Nunito Sans;color: #4A4A4A;">Associate</label>
							</div>	
							<div id="emp_score_dd_div" class="col-sm-6" style="text-align:left;">
								<div class='col-sm-7'>
								<!-- <label style="font-weight:500;"> Score  </label>  -->
                                   <input type='hidden' id="emp_dropdown" data-toggle="tooltip" data-placement="right" size="1" disabled> 
								</div>
								<div class='col-sm-4'> 
								<!-- <label style="color:#4A4A4A;font-family:Nunito Sans;font-size: 12px;font-weight: bold;">SCORE</label> -->
								<div id="rateemp" class="rateemp"></div></div>
							</div>
							<div class="col-sm-12">
								<!-- <label style="font-size:14px;width:100%;font-weight:500;" id="emp_commentLabel"><img src="images/comment.png" style="width:2%;margin-right:0.5%;"></img>Comments</label> -->
								<textarea rows="3" cols="100" id="emp_remarks" charswidth="23" class="emp_remarks"  placeholder="   Drop your comment here"style="margin-top:1%;width:96%;margin-bottom:1%;resize: none;border:solid 1px #CECECE" maxlength="2500"></textarea>
							</div>
						</div>
						<div class="col-sm-12" style="margin-top:0%;padding-top:2%;padding-bottom:2%;padding-left:0% !important;" id="modal_appr_sec">
							<div class="col-sm-6">
								<label class="pull-left" id="appraiserName" style="font-weight:bold;font-family:Nunito Sans;color: #4A4A4A;">Appraiser</label>

							</div>	
							<div id="appr_score_dd_div" class="col-sm-6" style="text-align:center;">
								<div class='col-sm-7'>
                                   <!-- <label style="font-weight:500;"> Score  </label>  -->
                                   <input type='hidden' id="appr_dropdown" data-toggle="tooltip" data-placement="right" size="1" disabled> 
                                 </div>
                                <div class='col-sm-4'><div id="rateappr" class="rateappr" ></div></div>
							</div>
							<div class="col-sm-12">
								<!-- <label style="font-size:14px;width:100%;font-weight:500;" id="appr_commentLabel"><img src="images/comment.png" style="width:2%;margin-right:0.5%;"></img>Comments</label> -->
								<textarea rows="3" cols="100" id="appr_remarks" charswidth="23" maxlength="2500"   placeholder="   Drop your comment here" class="appr_remarks" style="margin-top:1%;width:96%;margin-bottom:1%;resize: none;border:solid 1px #CECECE""></textarea>
							</div>
						</div>
						<div class="col-sm-12" style="margin-top:0%;padding-top:2%;padding-bottom:0%;padding-left:0% !important;" id="modal_rev_sec">
							<div class="col-sm-6">
								<label class="pull-left" id="reviewerName" style="font-weight:bold;font-family:Nunito Sans;color: #4A4A4A;">Reviewer</label>
							</div>	
							<div class="col-sm-6" style="text-align:center;">
								<div class='col-sm-7'>
                                 <!-- <label style="font-weight:500;"> Score  </label> --> 
                                  <input type='hidden' id="rev_dropdown" data-toggle="tooltip" data-placement="right" size="1" disabled> 
                                 </div>
                                <div class='col-sm-4'><div id="raterev" class="raterev"></div></div>
							</div>
							<div class="col-sm-12">
								<!-- <label style="font-size:14px;width:100%;font-weight:500;"><img src="images/comment.png" style="width:2%;margin-right:0.5%;"></img>Comments</label> -->
								<textarea rows="3" cols="100" id="rev_remarks"  maxlength="2500"  charswidth="23"  placeholder="   Drop your comment here" class="rev_remarks" style="margin-top:1%;width:96%;margin-bottom:1%;resize: none;border:solid 1px #CECECE""></textarea>
							</div>
						</div>
					</div>
					<div class="col-sm-3 row" style="width: 279px;padding-right:7px !important;background-color:#F4F4F5" id="performanceIndicatorDiv">
						<label style="width:100%; style="height: 24px;width: 175px;color: #4A4A4A;font-family: Nunito Sans;font-size: 17px;font-weight: 300;line-height: 24px;">
							<span class="pull-left"><p  style="height: 24px;width: 175px;color: #4A4A4A;font-family:Nunito Sans;font-size: 17px;font-weight: 300;line-height: 24px;padding-top:10px"> Performance Indicator</p></span>
						</label>
						<div class="col-sm-12" style="border-bottom:1px solid #d3d5d3;padding:0px !important;margin:0% 0 5% 0;">
							<label class="pull-left" style="float:none;font-weight:400;">Previous Level</label>
							<label id="pi_previous"  style="width:100%;font-weight:lighter;margin-bottom:5%;height:auto;cursor:pointer;"> </label>
							<textarea rows="5" cols="50" id="pi_previous_ta" charswidth="23" class="emp_remarks" style="margin-top:1%;width:100%;margin-bottom:5%;resize: vertical;display:none;" readonly></textarea>
						</div>
						<div class="col-sm-12" style="border-bottom:1px solid #d3d5d3;padding:0px !important;margin:0% 0 5% 0;">
							<label class="pull-left" style="float:none;font-weight:400;">Current Level</label>
							<label id="pi_current"  style="width:100%;font-weight:lighter;margin-bottom:5%;height:auto;"> </label>
							<textarea rows="5" cols="50" id="pi_current_ta" charswidth="23" class="emp_remarks" style="margin-top:1%;width:100%;margin-bottom:5%;resize: vertical;display:none;" readonly></textarea>
						</div>
						<div class="col-sm-12" style="padding:0px !important;margin:0% 0% 5% 0%;"> 
							<label class="pull-left" style="float:none;font-weight:400;">Next Level</label>
							<label id="pi_next"  style="width:100%;font-weight:lighter;margin-bottom:5%;height:auto;"></label>
							<textarea rows="5" cols="50" id="pi_next_ta" charswidth="23" class="emp_remarks" style="margin-top:1%;width:100%;margin-bottom:5%;resize: vertical;display:none;" readonly></textarea>
						</div>
					</div>
				</div>            	
  <!--         	  </form>   
        	<span id="divForSaveAndContinue" class="row" style="padding-right:7%;">
            				<button id="saveAndContinueBtn" class="pull-left" data-dismiss="modal" aria-hidden="true" style="border-radius:0px !important;padding:1% 3.5% 1% 3.5%">Save</button>
            			</span>
   -->
        	</div>
      	</div>
</div>


<!------------------------------------------------------------------ competence modal box end---------------------------------------------------------------------------------->


<!------------------------------------------------------------- strength and weakness modal box starts----------------------------------------------------------------------------->


<div id="strengthAndWeaknessBox" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="padding-left: 0px !important;display:none; width:80% !important;height:499px !important;overflow-y:inherit !important;">
        <div class="modal-content clearfix" style="padding-bottom:1%;">
        	<div class="modal-header" style="border-bottom:2px solid #d3d5d3 !important;padding:1% !important;">
	            <div class="col-sm-12">
	             <!-- <img id="backArrow" class="pull-left" src="images/back arrow.png" align="left" style="cursor:pointer" aria-hidden="true" onclick="$('#strengthAndWeaknessBox').modal('hide');"> -->
	            <label style="padding-left: 17px;padding-top:5px;color:#4A4A4A;font-family:Nunito Sans;font-size: 22px;font-weight: 300;">Appraisal Summary</label>
	            <img class="pull-right" src="images/close-button.png" data-dismiss="modal" align="center" aria-hidden="true" style="margin-right:0%;cursor:pointer;" onclick="$('#strengthAndWeaknessBox').modal('hide');">
	            </div>
	            <div class="col-sm-12">
	            	<div class="col-sm-7" style="padding-left:0px !important;padding-right:0px !important;">
	            			<span class="col-sm-9 pull-left" style="padding-left:0px !important;padding-top:1%;">
	            						<label id="questionLabelSW" style="color: #4A4A4A;cursor: pointer;font-family: Nunito Sans;font-size: 15px;font-weight:300;padding-left: 18px;"> </label>
	            						<label id="questionLabelSW2" style="color: #4A4A4A;cursor: pointer;font-family: Nunito Sans;font-size: 15px;font-weight:300;padding-left: 28px;"> </label>
	               			</span>
	               			</div>
	            		<div class="col-sm-3 col-sm-push-1" style="padding-left:0px !important;padding-right:0px !important;">
	<button id="saveSW" class="pull-left" data-dismiss="modal"aria-hidden="true" style="cursor:pointer;margin-right:15px;"> Save</button>
					</div>
	               			
	            	</div>
	            	<!-- <div class="col-sm-3" style="padding-right:1% !important;padding-top:0.5%;">
	            		            	
	            </div> -->

        	</div>
	        <div class="modal-body" style="padding-bottom:0px;">
					<div class="col-sm-12" style="padding-left:0% !important;">
						<div class="col-sm-12" style="padding-left:0% !important;padding-down:1%">
							<div  class="col-sm-12" style="margin-top:0%;padding-top:2%;padding-bottom:2%;padding-left:0% !important;" id="modal_emp_sec_sw">
								<div class="col-sm-12">
									<label class="pull-left" style="color: #4A4A4A;font-family:Nunito Sans;font-size: 16px;font-weight:bold;padding-left:13px">Associate</label>
								</div>	
								<div class="col-sm-12">
									<label id="sOrwLabel" style="color:#4A4A4A;font-family:Nunito Sans;;font-size:16px;width:100%;font-weight:400;padding-left:13px"></label>
									<ol>
									<li><input type="text" class="emp_remarks_sw" id="emp_SW1"  maxlength="45" style="margin-top:1%;width:65%;margin-bottom:1%;resize: vertical;margin-left:1%;float:none;"></li>
									<li><input type="text" class="emp_remarks_sw" id="emp_SW2"  maxlength="45" style="margin-top:1%;width:65%;margin-bottom:1%;resize: vertical;margin-left:1%;float:none"></li>
									<li><input type="text" class="emp_remarks_sw" id="emp_SW3"  maxlength="45" style="margin-top:1%;width:65%;margin-bottom:1%;resize: vertical;margin-left:1%;float:none;"></li>
								    </ol>
								</div>
							</div>
							<div class="col-sm-12" style="margin-top:0%;padding-top:2%;padding-bottom:2%;padding-left:0% !important;" id="modal_appr_sec_sw">
								<div class="col-sm-12">
									<label class="pull-left" style="color: #4A4A4A;font-family:Nunito Sans;font-size: 16px;font-weight:bold;padding-left:13px">Appraiser</label>
								</div>	
								<div class="col-sm-12">
									<label style="font-size:16px;color:#4A4A4A;width:100%;font-family:Nunito Sans;font-weight:400;padding-left:13px">What your supervisor would say ?</label>
									<ol>
									<li><input type="text" id="appr_SW1" class="appr_remarks_sw"  maxlength="45" style="margin-top:1%;width:65%;margin-bottom:1%;resize: vertical;margin-left:1%;float:none;"></li>
									<li><input type="text" id="appr_SW2" class="appr_remarks_sw"  maxlength="45" style="margin-top:1%;width:65%;margin-bottom:1%;resize: vertical;margin-left:1%;float:none;"></li>
									<li><input type="text" id="appr_SW3" class="appr_remarks_sw"  maxlength="45" style="margin-top:1%;width:65%;margin-bottom:1%;resize: vertical;margin-left:1%;float:none;"></li>
								    </ol>
								</div>
							</div>
						<!-- 	<div class=col-sm-12 style="margin-left:1%">
	<button id="saveSW" class="btn btn-default pull-left" class="close" data-dismiss="modal" aria-hidden="true" style="border-radius:0px !important;padding:1% 3% 1% 3%"> Save</button>
					</div> -->
					</div>            	
	        </div>
	      </div>
</div>
</div>
<!------------------------------------------------ Email box starts--------------------------------------------------------->
<div id="configMailModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display:none;overflow-y:auto !important; width:60% !important;left:20% !important;">
    <div class="modal-content clearfix" style="padding-bottom:0%;">   
       <div class="modal-header" style="border-bottom:1px solid #EEEEEE !important;padding:1% !important;">
           
           <h2 id="myModalLabel" style="padding-left:1%;padding-bottom:1%;font-weight:400;color:#9E9E9E;margin-top:15px !important">Compose mail
           	<button type="button" class="btn btn-danger btn-sm pull-right" style="margin-right:1.5%" data-dismiss="modal" aria-hidden="true" onclick="$('.configMailSummerNote').destroy();">
           	<i class="fa fa-times" style="margin-right:0.5%;"></i>
           	Discard
           	</button>
           </h2>
       </div>
       <div class="modal-body" id="configMailModalBody">
           <form id="configMailform">
           	<input type="hidden" id="empId" name="empId">
           	<div class="row">
<label style="padding-left:1%;font-weight:400;color:#9E9E9E;margin-right:4%;width:10%;float:left;padding-top:1%;">Subject: </label>	           	
           	<input type="text" class="form-control" id="emailSubject" name="subject" style="height:25px !important;width:80%; box-sizing:content-box;" placeholder="Subject Title">
           	</div>
               <div class="row" style="border:1px solid #dddddd;margin-top:1.5%;">
                       <textarea class="configMailSummerNote" id="configMailtext" name="configMailtext" rows="4" style="width:100%" placeholder="Enter Message"></textarea>
                </div>
           </form>
       </div>
       <div class="modal-footer" style="border-top:none !important;padding:1px 20px 20px !important;margin-top:0px;">
           <button class="btn btn-success" id="send_button" onclick="sendMailToSpecificEmp()"><i class="fa fa-send" style="margin-right:3px;"></i> Send Email</button>
           <button class="btn btn-default-custom" data-dismiss="modal" aria-hidden="true" onclick="$('.configMailSummerNote').destroy();">Close</button>
        </div>
    </div>    
</div>

<!-------------------------------------------------Email box ends --------------------------------------------------------->

				
				
					
<!------------------------------------------------------------- strength and weakness modal box starts------------------------------------------->

<!-- confirm box starts here -->
<div id="dialog-confirm" title="Submit Competence" style="display:none;">
  		<p><i class="fa fa-times" style="float:left; margin:12px 12px 20px 0;"></i>Are you sure you want to submit ? <br>You can not edit the form after this action.</p>
</div>
<!-- confirm box ends here -->
<script type='text/javascript'>

var logoutURL = '<c:url value="/login/logout.do"/>';
var getMyFormDataURL =  '<c:url value="/competency/getcompetencies.do"/>';
var updateCompetenciesURL = '<c:url value="/competency/updatecompetencies.do"/>';
var saveCompetenciesURL = '<c:url value="/competency/savecompetencies.do"/>';
var createNewCycleURL = '<c:url value="/admin/createnewcycle.do"/>';
var fetchEmpProgressURL = '<c:url value="/admin/employeestatusdata.do"/>';
var generateEmpMetricSheetURL = '<c:url value="/admin/generatemetricsheet.do"/>';
var sendEmailToAllURL = '<c:url value="/admin/sendemailtoallemp.do"/>';
var fetchEmpProgressCheckedEmpListURL = '<c:url value="/admin/fetcheckedempprogresslist.do"/>';
var sendEmailToSingleEmpURL = '<c:url value="/admin/sendemailtosingleemp.do"/>';
var updateRevScoreAndRemarksURL = '<c:url value="/admin/updaterevscoreandremarks.do"/>';
var getActiveAndAboveConsulantEmpURL = '<c:url value="/admin/mapreviewerandemployee.do"/>';
var getHRAdminMemberURL = '<c:url value="/admin/getHRAdminMember.do"/>';
var mapReviewerWithHRAdminURL = '<c:url value="/admin/mapreviewerwithhradmin.do"/>';
var mapEmployeeWithReviewerURL = '<c:url value="/admin/mapreviewerwithemployees.do"/>';
var sendMailToAppraiserURL = '<c:url value="/competency/sendmailtoappr.do"/>';
var getreviewerfinalratingURL = '<c:url value="/competency/getreviewerfinalrating.do"/>';
var getSameApprRevDataURL = '<c:url value="/competency/getSameApprRevData.do"/>';
var generateExportedDataURL = '<c:url value="/admin/dataExport.do"/>';
var updateCycleURL = '<c:url value="/admin/updatecycle.do"/>';

var user = ${user};

var apprCycle = ${apprCycle};
var userGeneralInfo = ${userGeneralInfo};
var myTeamDataMap = ${myTeamData};
var totalCycles = ${totalCycles};

$(document).ready(function(event){
	$('[data-toggle="tooltip"]').tooltip({container: 'body',trigger : 'hover'});
	renderMenuBasedOnRole();
	competencyCache = new prepareCompetencyCache();
	adminCache = new prepareAdminPanelCache();
	showDashboard();
	setUserName();
	initializeDatePickers();
	//setEndDates();
	var heightOfWindow = ($(document).height()) - 50;
	$('#sideDiv').css({"height": heightOfWindow});
	setCycleDatesOnHeader();
	setCycleLablerOnHeader();
});

function initializeDatePickers(){
	/*  $("#extend_cycle_enddate").datepicker().on("changeDate", function(ev) {
		$("#extend_cycle_enddate").datepicker('hide');
	});
	$("#extend_self_ap_enddate").datepicker().on("changeDate", function(ev) {
			$("#extend_self_ap_enddate").datepicker('hide');
	});
	$("#extend_mng_ap_enddate").datepicker().on("changeDate", function(ev) {
		$("#extend_mng_ap_enddate").datepicker('hide');
	});
	$("#extend_rev_ap_enddate").datepicker().on("changeDate", function(ev) {
			$("#extend_rev_ap_enddate").datepicker('hide');
	}); */
	
 }

function setUserName(){
		var username = (user.username).split('.')[0];
		username = username.toLowerCase().replace(/\b[a-z]/g, function(letter) {
		    return letter.toUpperCase();
		});
		document.getElementById('username').innerHTML = username;	
}

function logout(){
  	window.location = logoutURL;
  	alert("wrong password");
  	sessionStorage.setItem('id',"");
	sessionStorage.invalidate();
}

function renderMenuBasedOnRole(){
	debugger
	var userrole = user.roleStatus; 
	if(userrole != undefined && userrole != null && userrole != ""){
		 if(userrole == "hrAdmin"|| userrole =="admin"){
			 $('#adminDashboardLink').show();
		 }
		 else
			 {
			 $('#adminDashboardLink').hide();
			 }
	}
}


function showToster(title, msg, time, status) {
	toastr.options = {
		"closeButton" : true,
		"debug" : false,
		"progressBar" : true,
		"positionClass" : "toast-top-right",
		"onclick" : null,
		"showDuration" : "100",
		"hideDuration" : "1000",
		"timeOut" : time * 1000,
		"extendedTimeOut" : "1000",
		"showEasing" : "swing",
		"hideEasing" : "linear",
		"showMethod" : "fadeIn",
		"hideMethod" : "fadeOut",
		"preventDuplicates" : true
	}
	var $toast = toastr[status](msg, title);
	$("#toast-container").attr('style','margin-top:10px');
}

function displayError(response, error, thrownError) {

	if (response.status == 0) {
		showToster(thrownError + "!",
				'You are offline!!\n Please Check Your Network.', 10, 'error');
	} else if (response.status == 404) {
		showToster(thrownError + "!", "Requested URL not found.", 10, 'error');
	} else if (response.status == 403) {
		showToster("Security Access Lock !", getHeaderContent(response.responseText), 10, 'error');
	} else if (response.status == 500) {
		showToster("Wrong input !", getHeaderContent(response.responseText), 10, 'error');
	} else if (error == 'parsererror') {
		showToster(thrownError + "!", 'Error.\nParsing JSON Request failed.', 10, 'error');
	} else if (error == 'timeout') {
		showToster(thrownError + "!", 'Request Time out.',10, 'error');
	} else if (response.status == 000) {

	} else {
		showToster(thrownError + "!", 'Unknow Error.', 10, 'error');
		alert('Unknow Error.\n' + response.responseText);
	}
}

// custom confirm box.
$( function() {
    $( "#dialog-confirm" ).dialog({
      resizable: false,
      height: "auto",
      width: 400,
      modal: true,
      autoOpen: false,
      buttons: {
        "ok": function() {
          updateCompetencies();
          $( this ).dialog( "close" );
        },
        Cancel: function() {
          $( this ).dialog( "close" );
        }
      }
    });
 } );

$('body').on("click",function(){
	var heightOfWindow = $(document).height();
	$('#sideDiv').css({"height": heightOfWindow});
});

$('.collapse-link').on('click', function (e) {
    e.preventDefault();
    var ibox = $(this).closest('div.ibox');
    var button = $(this).find('i');
    var content = ibox.children('.ibox-content');
    content.slideToggle(200);
    button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
    ibox.toggleClass('').toggleClass('border-bottom');
    setTimeout(function () {
        ibox.resize();
        ibox.find('[id^=map-]').resize();
    }, 50);
});

function showAdminDashboard(){
	debugger
	var userrole = user.roleStatus; 
	if(userrole != undefined && userrole != null && userrole != ""){
		 if(userrole == "hrAdmin"){
			 $('#adminDashboard').show();
			 $('#userDashboard').hide();
			 $('#adminDashboardContentArea').hide();
			 $('#adminDashboardContentArea').html();
			 $('#adminDashboardContentArea1').hide();
			 $('#adminDashboardContentArea1').html();
			 $('#CheckMandatoryFieldsForExtendDates').hide();
			 
				
		 }
		 else if(userrole=="admin"){
			 $('#adminDashboard').show();
			 $('#userDashboard').hide();
			 $('#createNewCycle').hide();
			 $('#updateDates').hide();
			 $('#showEmployeeProgressView').hide();
			 $('#generateEmployeeMetricSheet').show();
			 $('#mapEmployeeWithReviewerView').hide();
			 $('#mapHRAdminForReviewerLevel2View').hide();
			 $('#adminDashboardContentArea').hide();
			 $('#adminDashboardContentArea').html();
			 $('#adminDashboardContentArea1').hide();
			 $('#adminDashboardContentArea1').html();
			 $('#CheckMandatoryFieldsForExtendDates').hide();
			 
		 }
		 
		
	}
	setCycleDetailsInHeaders();
	checkBackButton();
}

/* function showAdminDashboard(){
	$('#adminDashboard').show();
	$('#userDashboard').hide();
	setCycleDetailsInHeaders();
} */

function showUserDashboard(){
	$('#adminDashboard').hide();
	$('#userDashboard').show();
}

function setCycleDatesOnHeader(){
	$('#selfAssessmentED').html('<span style="height: 23px;	width: 153px;color: #4A4A4A;font-family:Nunito Sans;font-size: 16px;	font-weight: bold;line-height: 23px;">'+ moment(apprCycle.selfApprStartDate).format('DD-MMM ')+'<span>To</span>'+moment(apprCycle.selfApprEndDate).format(' DD-MMM-YYYY')+'<span>');
	
	$('#apprAssessmentED').html('<span style="height: 23px;	width: 153px;color: #4A4A4A;font-family:Nunito Sans;font-size: 16px;	font-weight: bold;line-height: 23px;">'+ moment(apprCycle.mngApprStartDate).format('DD-MMM ')+'<span>To</span>'+moment(apprCycle.mngApprEndDate).format(' DD-MMM-YYYY')+'<span>');
	
	$('#revAssessmentED').html('<span style="height: 23px;	width: 153px;color: #4A4A4A;font-family:Nunito Sans;font-size: 16px;	font-weight: bold;line-height: 23px;">'+ moment(apprCycle.revApprStartDate).format('DD-MMM ')+'<span>To</span>'+moment(apprCycle.revApprEndDate).format(' DD-MMM-YYYY')+'<span>');
}

function checkBackButton(){
	if($("#actionContainer").css('display')=="block"){
	$("#crossAndBack").children()[1].remove()
	$('#CheckMandatoryFieldsForExtendDates').hide();
	}
	else{
	var backButton = $('<button onclick="backToDashboard();" class="btn btn-circle btn-close pull-right" style="margin-left:1%;" data-toggle="tooltip" data-placement="bottom" title="Back"><i class="fa fa-mail-reply-all" style="margin-right:1%;font-size:11px;"></i></button>')
	   $("#crossAndBack").append(backButton);
	// $('#CheckMandatoryFieldsForExtendDates').hide();
	}
	}
	
function setCycleLablerOnHeader(){
	debugger
	var userstatus = userGeneralInfo.status; 
	if(userstatus != undefined && userstatus != null && userstatus != ""){
		/*  if(userstatus == "Self Assessment - pending"){
			 $('#label-bar-self').attr("src","images/circle.png");
				
		 }
		 else if(userstatus == "3")
			 {
			 $('#label-bar-appr').attr("src","images/circle-color.png");
			 } */
			 
			 if(userstatus=="Appraiser Assessment - pending"){
				 $("#ball1").css("background-color","#64C494");
			 }
			 else if(userstatus=="Reviewer Assessment - pending"){
				 $("#ball1").css("background-color","#64C494");
				 $("#ball2").css("background-color","#64C494");
			 }
			 else if(userstatus!="Self Assessment - pending"){
				 $("#ball1").css("background-color","#64C494");
				 $("#ball2").css("background-color","#64C494");
				 $("#ball3").css("background-color","#64C494");
			 }
		 
	}
}



 document.getElementById('CheckMandatoryFields').onclick = function() {
	if((!mandatoryField(cycle_title, "Cycle Title"))||(!mandatoryField(cycleStartDate, "Cycle Start Date")) ||(!mandatoryField(cycleEndDate, "Cycle End Date"))||(!mandatoryField(selfApprStartDate, "Self Start Date"))||(!mandatoryField(selfApprEndDate, "Self End Date"))||(!mandatoryField(mngApprStartDate, "Appraiser Start Date"))||(!mandatoryField(mngApprEndDate, "Appraiser End Date"))||(!mandatoryField(revApprStartDate, "Reviewer Start Date"))||(!mandatoryField(revApprEndDate, "Reviewer End Date"))){
	return false;
	}
	else {
		createNewCycleAjax();
    }
    return true;
} 
 function nWin() {
	  var w = window.open();
	  var html = $("#toNewWindow").html();
	    $(w.document.body).html(html);
}
$(function() {
	    $("a#print").click(nWin);
});

function extendDatesValidations() {
	debugger;
	var cycleEndDate = $('#extendCycleEndDate').val();
	var selfEndDate = $('#extendSelfApprEndDate').val();
	var apprEndDate = $('#extendMngApprEndDate').val();
	var revEndDate = $('#extendRevApprEndDate').val();
	if(selfEndDate>cycleEndDate){
		showToster('Warning !',  selfEndDate + " should be less than " + cycleEndDate, 5, "warning");
	}
	else if(apprEndDate>cycleEndDate){
		showToster('Warning !',apprEndDate + " should be less than " + cycleEndDate, 5, "warning");
	}
	else if(revEndDate>cycleEndDate){
		showToster('Warning !', revEndDate + " should be less than " + cycleEndDate, 5, "warning");
	}
	else if(selfEndDate>apprEndDate){
		showToster('Warning !', selfEndDate + " should be less than " + apprEndDate, 5, "warning");
	}
	else if(selfEndDate>revEndDate){
		showToster('Warning !', selfEndDate + " should be less than " + revEndDate, 5, "warning");
	}
	else if(apprEndDate>revEndDate){
		showToster('Warning !', apprEndDate + " should be less than " + revEndDate, 5, "warning");
	}
	else {
		updateCycleAjax();
    }
}
/* document.getElementById('CheckMandatoryFieldsForExtendDates').onclick = function() {
		updateCycleAjax();
} */
</script>
</body>
</html>