/**
 * 
 */ 

// @Author:Rushikesh
function prepareAdminPanelCache(){
	
	var cache = {
		 empProgressMap : {},
		 cycleDataMap : null,
		 extendedCycleDataMap : null,
		 metricSheetDataMap : {},
		 metricSheetRevApprMap : {},
		 revScoreFromMetricSheetMap : null,
		 aboveConsultantEmployeeMap : {},
		 activeEmployeeMap : {},
		 hrAdminMap : {},
		 mappingContainer : null,
		 
		 getCreateCycleDataMap : function(){
			 var cachedDataMap = cache.cycleDataMap;
				if(cachedDataMap == undefined && cachedDataMap == null){
					cache.cycleDataMap = new Map();
					return cache.cycleDataMap;
				}
				return cachedDataMap;
		 },
		 getUpdateCycleDataMap : function(){
			 var cachedDataMap = cache.extendedCycleDataMap;
				if(cachedDataMap == undefined && cachedDataMap == null){
					cache.extendedCycleDataMap = new Map();
					return cache.extendedCycleDataMap;
				}
				return cachedDataMap;
		 },
		 
		 getEmpProgressDataMap : function(){
			 var cachedDataMap = cache.empProgressMap;
				if(cachedDataMap != undefined && cachedDataMap != null && !jQuery.isEmptyObject(cachedDataMap)){
					return cachedDataMap;
				}else{
					fetchEmployeeProgressDataAjax();
					return cache.empProgressMap; 
				}
		 },
		 
		 getmetricSheetRevApprMap : function(){
			 	var cachedDataMap = cache.metricSheetRevApprMap;
				if(cachedDataMap == undefined && cachedDataMap == null){
					cache.metricSheetRevApprMap = new Map();
					return cache.metricSheetRevApprMap;
				}
				return cachedDataMap;
		 },
		 
		 getMetricSheetDataMap : function(){
			 	var cachedDataMap = cache.metricSheetDataMap;
				if(cachedDataMap != undefined && cachedDataMap != null && !jQuery.isEmptyObject(cachedDataMap)){
					return cachedDataMap;
				}else{
					fetchEmpMetricSheetDataAjax();
					return cache.metricSheetDataMap; 
				}
		 },
		 
		 
		 getAboveConsulantEmployee : function(){
			 	var cachedDataMap = cache.aboveConsultantEmployeeMap;
				if(cachedDataMap != undefined && cachedDataMap != null && !jQuery.isEmptyObject(cachedDataMap)){
					return cachedDataMap;
				}else{
					getAllActiveAndAboveConsultantEmployeesAjax();
					return cache.aboveConsultantEmployeeMap; 
				}
		 },
		 
		 getAllActiveMembers : function(){
			 	var cachedDataMap = cache.activeEmployeeMap;
				if(cachedDataMap != undefined && cachedDataMap != null && !jQuery.isEmptyObject(cachedDataMap)){
					return cachedDataMap;
				}else{
					getAllActiveAndAboveConsultantEmployeesAjax();
					return cache.activeEmployeeMap; 
				}
		 },
		 
		 getHRAdminMembers : function(){
			 	var cachedDataMap = cache.hrAdminMap;
				if(cachedDataMap != undefined && cachedDataMap != null && !jQuery.isEmptyObject(cachedDataMap)){
					return cachedDataMap;
				}else{
					getHRAdminMembersAjax();
					return cache.hrAdminMap; 
				}
		 },
		 getExporteddataMap : function(){
			 	var cachedDataMap = cache.exportDataMap;
				if(cachedDataMap != undefined && cachedDataMap != null && !jQuery.isEmptyObject(cachedDataMap)){
					return cachedDataMap;
				}else{
					getExportDataAjax();
					return cache.exportDataMap; 
				}
		 },
		 
		 getMappingContainer : function(){
			 	var cachedDataMap = cache.mappingContainer;
				if(cachedDataMap == undefined && cachedDataMap == null){
					cache.mappingContainer = new Map();
					return cache.mappingContainer;
				}
				return cachedDataMap;
		 }
		 
	};
	
	return cache;
}



function prepareBodyForAdminPanel(){
	var adminPanelBody = $('<div class="container-fluid"></div>'); 
	var headerDiv = $('<div class="col-sm-12" style="text-align:left;padding-top:3%;padding-bottom:1%;font-size:600;"> Avail Actions</div>');
    var optionsDiv = $('<div class=""col-sm-12">');	
}

function createNewCycle(){
	$('#adminDashboardContentArea').hide();
	$('#adminDashboardContentArea').html();
	$('#actionContainer').hide();
	$('#createNewCycelContainer').show();
	$('#extendDates').hide();
	$('#CheckMandatoryFieldsForExtendDates').hide();
	cycleDatesValidations();
	checkBackButton();
}

function extendDates(){
	$('#adminDashboardContentArea').hide();
	$('#adminDashboardContentArea').html();
	$('#actionContainer').hide();
	$('#extendDates').show();
	$('#CheckMandatoryFieldsForExtendDates').show();
	cycleDatesValidationsForExtendDates();
	checkBackButton();
	$("#extendCycleEndDate:text").val(apprCycle.endate);
	$("#extendSelfApprEndDate:text").val(apprCycle.selfApprEndDate);
	$("#extendMngApprEndDate:text").val(apprCycle.mngApprEndDate);
	$("#extendRevApprEndDate:text").val(apprCycle.revApprEndDate);
}


function emptyAllFieldsOfCreateCycle(){
	$('#cycle_title').val('');
	$('#cycleStartDate').val('');
	$('#cycleEndDate').val('');
	$('#selfApprStartDate').val('');
	$('#selfApprEndDate').val('');
	$('#mngApprStartDate').val('');
	$('#mngApprEndDate').val('');
	$('#revApprStartDate').val('');
	$('#revApprEndDate').val('');
}

function setCycleDetailsInHeaders(){
	$('#currentCycleName').html(apprCycle.cycleName);
	$('#durationOfCycleSD').html(moment(apprCycle.startDate).format("DD MMM YY"));
	$('#durationOfCycleED').html(moment(apprCycle.endate).format("DD MMM YY"));
	$('#totalCycles').html(totalCycles);
}



function getDataOfExtendedCycle(){
	var extendedCycleDataMap = adminCache.getUpdateCycleDataMap();
	extendedCycleDataMap.set("cycle_extend_ed",$('#extendCycleEndDate').val());
	extendedCycleDataMap.set("self_extend_ed",$('#extendSelfApprEndDate').val());
	extendedCycleDataMap.set("appr_extend_ed",$('#extendMngApprEndDate').val());
	extendedCycleDataMap.set("rev_extend_ed",$('#extendRevApprEndDate').val());
	return extendedCycleDataMap;
}

function getDataOfNewCycle(){
	var cycleDataMap = adminCache.getCreateCycleDataMap();
	cycleDataMap.set("title",$('#cycle_title').val());
	cycleDataMap.set("cycle_sd",$('#cycleStartDate').val());
	cycleDataMap.set("cycle_ed",$('#cycleEndDate').val());
	cycleDataMap.set("self_sd",$('#selfApprStartDate').val());
	cycleDataMap.set("self_ed",$('#selfApprEndDate').val());
	cycleDataMap.set("appr_sd",$('#mngApprStartDate').val());
	cycleDataMap.set("appr_ed",$('#mngApprEndDate').val());
	cycleDataMap.set("rev_sd",$('#revApprStartDate').val());
	cycleDataMap.set("rev_ed",$('#revApprEndDate').val());
	return cycleDataMap;
}

function backToDashboard(){
	$('#adminDashboardContentArea').html('');
	$('#actionContainer').show();
	$('#createNewCycelContainer').hide();
	$('#extendDates').hide();
	checkBackButton();
}

function viewProgressStatusDropdown(){
	
	$('#tableId').DataTable( {
	"bStateSave": true,
	   	initComplete: function () {
	   	this.api().columns([3]).every( function () {
	               var column = this;
	               var select = $('<select style="margin-right: 19px;"><option value="">Show all</option></select>')
	               .appendTo( $(column.header()) )
	                   .on( 'change', function () {
	                       var val = $.fn.dataTable.util.escapeRegex(
	                           $(this).val()
	                       );
	                     column
	                           .search( val ? '^'+val+'$' : '', true, false )
	                           .draw();
	                   } );

	               column.cells('', column[0]).render('display').sort().unique().each( function ( d, j ) {
	                   if(column.search() === '^'+d+'$'){
	                       select.append( '<option value="'+d+'" selected="selected">'+d+'</option>' )
	                   } else {
	                   	var val = $('<div/>').html(d).text();
	                   	select.append( '<option value="' + val + '">' + val + '</option>' );
	                   }
	               } );
	           } );
	   	
	       }

	   } );

	}

function exportdataDropdown(){
	
	$('#exportTableId').DataTable( {
	"bStateSave": true,
	   	initComplete: function () {
	   	this.api().columns([3]).every( function () {
	               var column = this;
	               var select = $('<select style="margin-right: 19px;"><option value="">Show all</option></select>')
	               .appendTo( $(column.header()) )
	                   .on( 'change', function () {
	                       var val = $.fn.dataTable.util.escapeRegex(
	                           $(this).val()
	                       );
	                     column
	                           .search( val ? '^'+val+'$' : '', true, false )
	                           .draw();
	                   } );

	               column.cells('', column[0]).render('display').sort().unique().each( function ( d, j ) {
	                   if(column.search() === '^'+d+'$'){
	                       select.append( '<option value="'+d+'" selected="selected">'+d+'</option>' )
	                   } else {
	                   	var val = $('<div/>').html(d).text();
	                   	select.append( '<option value="' + val + '">' + val + '</option>' );
	                   }
	               } );
	           } );
	   	
	       }

	   } );


	}

function showEmployeeProgressView(){
	$('#adminDashboardContentArea').show();
	$('#adminDashboardContentArea').html('');
	$('#actionContainer').hide();
	$('#createNewCycelContainer').hide();
	var button= $('<button onclick="SubmitCheckedEmpID()" id="empIdCheckList"  style="margin-left: 500px;" class="btn btn-outline-green btn-success" > Send Mail </button>');
	var title = "View Progress";
	var icon = $('<i class="fa fa-line-chart" style="color:#18A689;margin-right:1%;"></i>');
	var titleDiv = setHeaderOfAvailActionProgress(title,icon,button);
	var progressContainter = $('<div class="col-sm-12">');
	var tableContainer = $('<div class="table-responsive">');
	var table = $('<table class="table" id="tableId">');
	var thead = $('<thead>');
	var tr = $('<tr>');
	   var sno = $('<th style="text-align:left;">').html('#');
	   var employeeName = $('<th>').html('Employee Name');
	   var department = $('<th style="text-align:center;">').html('Department');
	   var apprStatus = $('<th style="text-align:center;">').html('Status');
	var action = $('<th style="text-align:center;">').html('Action');
	tr.append(sno);
	tr.append(employeeName);
	tr.append(department);
	tr.append(apprStatus);
	tr.append(action);
	thead.append(tr);
	;
	var tbody = prepareBodyOfEmployeeProgress();
	table.append(thead);
	table.append(tbody);
	progressContainter.append(table);
	$('#adminDashboardContentArea').append(titleDiv);
	$('#adminDashboardContentArea').append(progressContainter);
	// $('#tableId').DataTable();
	viewProgressStatusDropdown();
	checkBackButton();
	}

function prepareBodyOfEmployeeProgress(){
	var progressDataMap = adminCache.getEmpProgressDataMap();
	var tbody = $('<tbody>');
	if(progressDataMap != undefined && progressDataMap != null && !jQuery.isEmptyObject(progressDataMap)){
	var count = 1;
	for(var empId in progressDataMap){
	var tr = $('<tr>');
	var detailsJson = progressDataMap[empId];
	var noLabel = $('<input type="checkbox">');
	noLabel.attr("name","checkBoxes");
	noLabel.attr("value",empId);
	var noTd = $('<td style="text-align:left;">').append(noLabel);
	var empNameTd = $('<td>').html(detailsJson["employeeName"]);
	var departmentTd = $('<td style="text-align:center;">').html(detailsJson["function"]);
	var apprStatus = detailsJson["progress"];
	var apprStatusTd = $('<td style="text-align:center;">');
	var label = $('<label style="text-align:center;width:100%;">');
	label.html(apprStatus);
	if(apprStatus == "Self Assessment - pending"){
	label.append('<i class="custom-icon icon-warning fa fa-level-down" style="color:#fff;margin-left:3%;"></i>');
	}else if(apprStatus == "Appraiser Assessment - pending"){
	label.append('<i class="custom-icon icon-primary fa fa-level-up" style="color:#fff;margin-left:3%;"></i>');
	}else if(apprStatus == "Reviewer Assessment - pending"){
	label.append('<i class="custom-icon label-deafult fa fa-level-up label label-custom" style="color:#fff;margin-left:3%;"></i>');
	}
	apprStatusTd.append(label);
	var action = $('<td onclick="showEmailBox(\''+empId+'\')" style="text-align:center;">');  
	var actionLabel = $('<label onclick="" data-toggle="tooltip" data-placement="right" title="send an email"><i class="fa fa-paper-plane" style="cursor:pointer;color:#1d9d74;"></i></label>');
	action.append(actionLabel);
	tr.append(noTd);
	tr.append(empNameTd);
	tr.append(departmentTd);
	tr.append(apprStatusTd);
	tr.append(action);
	tbody.append(tr);
	count++;
	}
	}else{
	var tr = $('<tr style="text-align:center;">').html('No Record Available');
	   tbody.append(tr);
	}
	return tbody;
	}

function generateEmployeeMetricSheet(){
	$('#adminDashboardContentArea').show();
	$('#adminDashboardContentArea').html('');
	$('#actionContainer').hide();
	$('#createNewCycelContainer').hide();
	var title = "Employee Metric Sheet";
	var icon = $('<i class="fa fa-file-text" style="color:#18A689;margin-right:1%;"></i>');
	var titleDiv = setHeaderOfAvailAction(title,icon);
	var metricSheetContainter = $('<div class="col-sm-12">');
	var tableContainer = $('<div class="table-responsive">');
	var table = $('<table class="table" id="metrictableId">');
	var thead = $('<thead>');
	var tr = $('<tr>');
    var no = $('<th style="text-align:left;">').html('#');
    var employeeName = $('<th style="text-align:left;">').html('Employee Name');
    var DesignationName = $('<th style="text-align:left;">').html('Designation');
    var AppraiserName = $('<th style="text-align:left;">').html('Appraiser Name');
    var ManagerName = $('<th style="text-align:left;">').html('Manager Name');
	var SelfScore = $('<th style="text-align:center;">').html('Self Rating');
	var ApprScore = $('<th style="text-align:center;">').html('Appraiser Rating');
	var RevScore = $('<th style="text-align:center;">').html('Reviewer Rating');
	var Rev2Score = $('<th style="text-align:center;">').html('Reviewer Level-2 Rating');
	var RevComments = $('<th style="text-align:center;">').html('Reviewer Comments');
	tr.append(no);
	tr.append(employeeName);
	tr.append(DesignationName);
	tr.append(AppraiserName);
	tr.append(ManagerName);
	tr.append(SelfScore);
	tr.append(ApprScore);
	tr.append(RevScore);
	tr.append(Rev2Score)
	tr.append(RevComments);
	thead.append(tr);
	var tbody = prepareBodyOfEmployeeMetricSheet();
	table.append(thead);
	table.append(tbody);
	metricSheetContainter.append(table);
	$('#adminDashboardContentArea').append(titleDiv);
	$('#adminDashboardContentArea').append(metricSheetContainter);
	$('#metrictableId').DataTable();
	checkBackButton();
}

function prepareBodyOfEmployeeMetricSheet(){
	
	var revId = user.empid;
	var cycleId = apprCycle.cycleId;
	var metricSheetDataMap = adminCache.getMetricSheetDataMap();
	var tbody = $('<tbody>');
	if(metricSheetDataMap != undefined && metricSheetDataMap != null && !jQuery.isEmptyObject(metricSheetDataMap)){
		var count = 1;
		for(var empId in metricSheetDataMap){
			var tr = $('<tr>');
			var empDataJson = metricSheetDataMap[empId];
			var noLabel = $('<label class="label label-success" style="background:#18A689;">').html(count);
			var noTd = $('<td style="text-align:left;">').append(noLabel);
			var empNameTd = $('<td style="text-align:left;">').html(empDataJson["employeeName"]);
			var designationNameId = $('<td style="text-align:left;">').html(empDataJson["designationName"]);
			var appraiserNameTd = $('<td style="text-align:left;">').html(empDataJson["appraiserName"]);
			var reviewerName = $('<td style="text-align:left;">').html(empDataJson["reviewerName"]);
			var seldRatingTd = $('<td id='+empId+"self"+' style="text-align:center;">').html(empDataJson["selfScore"]);
			var apprRatingTd = $('<td id='+empId+"appr"+' style="text-align:center;">').html(empDataJson["mngScore"]);
			var revRatingTd =  $('<td id='+empId+"rev"+' style="text-align:center;">').html(empDataJson["revScore"]);
			var revRating = empDataJson["rev2score"];
			var revComments = empDataJson["revRemarks"];
			var rev2RatingTd = $('<td style="text-align:center;">')
		    var rev2RatingLabel = $('<label data-toggle="tooltip" data-placement="right" title="click here to update" style="font-weight:400;" onclick="InlineEditRevRatings(\''+empId+'\',this,\''+revRating+'\',\''+revId+'\',\''+cycleId+'\')">').html(revRating);
			var selfVal = seldRatingTd.html();
			var apprVal = apprRatingTd.html();
			var revVal = revRatingTd.html();
			var endDate = new Date(moment(apprCycle.endate).format("DD MMM YY"));
			endDate.addDays(1);
			var currentDate = new Date();
			
			var revCommentTd= $('<td style="text-align:center;">');
		    var revCommentLabel = $('<label data-toggle="tooltip" data-placement="right" title="click here to update" style="font-weight:400;" onclick="InlineEditRevRemarks(\''+empId+'\',this,\''+revComments+'\',\''+revId+'\',\''+cycleId+'\')">').html(revComments);
		   if(currentDate>endDate){
				rev2RatingLabel.prop("onclick", null).off("click");
				revCommentLabel.prop("onclick", null).off("click");
				}
		    rev2RatingTd.append(rev2RatingLabel);
		    revCommentTd.append(revCommentLabel);
		    tr.append(noTd);
		    tr.append(empNameTd);
		    tr.append(designationNameId);
		    tr.append(appraiserNameTd);
		    tr.append(reviewerName);
		    tr.append(seldRatingTd);
		    tr.append(apprRatingTd);
		    tr.append(revRatingTd);
		    tr.append(rev2RatingTd);
		    tr.append(revCommentTd);
		    tbody.append(tr);
		    count++;
		}
	}else{
		var tr = $('<tr>').html('No Data Available');
		tbody.append(tr);
	}
	return tbody;
}

function exportdata(){
	debugger;
	$('#adminDashboardContentArea').show();
	$('#adminDashboardContentArea').html('');
	$('#actionContainer').hide();
	$('#createNewCycelContainer').hide();
	var title = "Export Employee Data";
	var icon = $('<i class="fa fa-file-text" style="color:#18A689;margin-right:1%;"></i>');
	var exportButton =  $('<a href="#"><button onclick="exportDataAjax()" style="margin-left: 500px;" class="btn btn-outline-green btn-success" > Export Data </button></a>');
	var titleDiv = setHeaderOfAvailActionExport(title,icon,exportButton);
	var exportDataContainer = $('<div class="col-sm-12">');
	var tableContainer = $('<div class="table-responsive">');
	var table = $('<table class="table" id="exportTableId">');
	var thead = $('<thead>');
	var tr = $('<tr>');
    var no = $('<th style="text-align:left;">').html('Employee Id');
    var employeeName = $('<th style="text-align:left;">').html('Employee Name');
    var DesignationName = $('<th style="text-align:left;width: 110px;">').html('Designation');
    var StatusName = $('<th style="text-align:left;width: 262px;">').html('Status');
    var AppraiserName = $('<th style="text-align:left;">').html('Appraiser Name');
    var ManagerName = $('<th style="text-align:left;">').html('Manager Name');
	var SelfScore = $('<th style="text-align:center;">').html('Self Rating');
	var ApprScore = $('<th style="text-align:center;">').html('Appraiser Rating');
	var RevScore = $('<th style="text-align:center;">').html('Reviewer Rating');
	tr.append(no);
	tr.append(employeeName);
	tr.append(DesignationName);
	tr.append(StatusName);
	tr.append(AppraiserName);
	tr.append(ManagerName);
	tr.append(SelfScore);
	tr.append(ApprScore);
	tr.append(RevScore);
	thead.append(tr);
	var tbody = prepareBodyOfExportDataSheet();
	table.append(thead);
	table.append(tbody);
	exportDataContainer.append(table);
	$('#adminDashboardContentArea').append(titleDiv);
	$('#adminDashboardContentArea').append(exportDataContainer);
	exportdataDropdown();
	checkBackButton();
}


function prepareBodyOfExportDataSheet(){
	debugger;
	var revId = user.empid;
	var cycleId = apprCycle.cycleId;
	var exportDataMap = adminCache.getExporteddataMap();
	var tbody = $('<tbody>');
	if(exportDataMap != undefined && exportDataMap != null && !jQuery.isEmptyObject(exportDataMap)){
		var count = 1;
		for(var empId in exportDataMap){
			var tr = $('<tr>');
			var empDataJson = exportDataMap[empId];
			var noLabel = $('<label class="label label-success" style="background:#18A689;">').html(empDataJson["employeeId"]);
			var noTd = $('<td style="text-align:left;">').append(noLabel);
			var empNameTd = $('<td style="text-align:left;">').html(empDataJson["employeeName"]);
			//var empTd = $('<td style="text-align:center;">').html(empDataJson["empId"]);
			var designationNameId = $('<td style="text-align:left;">').html(empDataJson["designationName"]);
			var apprStatus = empDataJson["status"];
			var apprStatusTd = $('<td style="text-align:center;">');
			var label = $('<label style="text-align:center;width:100%;">');
			label.html(apprStatus);
			if(apprStatus == "Self Assessment - pending"){
			label.append('<i class="custom-icon icon-warning fa fa-level-down" style="color:#fff;margin-left:3%;"></i>');
			}else if(apprStatus == "Appraiser Assessment - pending"){
			label.append('<i class="custom-icon icon-primary fa fa-level-up" style="color:#fff;margin-left:3%;"></i>');
			}else if(apprStatus == "Reviewer Assessment - pending"){
			label.append('<i class="custom-icon label-deafult fa fa-level-up label label-custom" style="color:#fff;margin-left:3%;"></i>');
			}
			apprStatusTd.append(label);
			var appraiserNameTd = $('<td style="text-align:left;">').html(empDataJson["appraiserName"]);
			var reviewerName = $('<td style="text-align:left;">').html(empDataJson["reviewerName"]);
			var seldRatingTd = $('<td id='+empId+"self"+' style="text-align:center;">').html(empDataJson["selfScore"]);
			var apprRatingTd = $('<td id='+empId+"appr"+' style="text-align:center;">').html(empDataJson["mngScore"]);
			var revRatingTd =  $('<td id='+empId+"rev"+' style="text-align:center;">').html(empDataJson["revScore"]);
		    tr.append(noTd);
		    tr.append(empNameTd);
		    tr.append(designationNameId);
		    tr.append(apprStatusTd);
		    tr.append(appraiserNameTd);
		    tr.append(reviewerName);
		    tr.append(seldRatingTd);
		    tr.append(apprRatingTd);
		    tr.append(revRatingTd);
		    tbody.append(tr);
		    count++;
		}
	}else{
		var tr = $('<tr>').html('No Data Available');
		tbody.append(tr);
	}
	return tbody;
}

function InlineEditRevRatings(empId,element,currentValue,revId,cycleId){
	
	var value = $(element).html();
	$(element).removeAttr('onclick');
	$(element).hide();
	var td = $(element).parent();
	var editText = $("<input type='text' maxlength='500' spellcheck=true >");
	editText.attr('style', 'box-sizing:content-box;margin-top:5px;');
	td.append(editText);
	editText.attr("onclick", "this.focus()");
	editText.focus(function() {
		$(this).val(currentValue);
	});
	editText.focus();
	editText.keydown(function(e) {
		if (e.which == 13) { // Enter
			if (editText.val() != value && editText.val().trim().length > 0) {
				 if((editText.val()>=1 && editText.val()<=5)){
				updateRevScoreOrRemarks(empId,'ratings',editText.val(), revId, cycleId);
				$(element).show();
				$(element).removeAttr('title');
				$(element).attr('title', editText.val());
				$(element).attr('onclick', 'InlineEditRevRatings('+ empId +',this, \''+editText.val()+'\','+revId+','+cycleId+')');
				$(element).html(editText.val());
				editText.unbind("focusout");
				editText.remove();
				 }
				 else
					 showToster('Error !',"Oops ! Rating should not be less than 1 and greater than 5", 5, "error");
				 }
		} else if (e.which == 27) {
			editText.unbind("focusout");
			editText.remove();
			$(element).show();
			$(element).val(value);
			$(element).attr('onclick', 'InlineEditRevRatings(' + empId + ',this, \''+editText.val()+'\','+revId+','+cycleId+')');
		}
	});

	editText.focusout(function() {
		editText.remove();
		$(element).show();
		$(element).attr('onclick', 'InlineEditRevRatings(' + empId + ',this, \''+editText.val()+'\','+revId+','+cycleId+')');
	});
	fetchEmpMetricSheetDataAjax();
	
		
}


function InlineEditRevRemarks(empId,element,currentValue,revId,cycleId){
	var value = $(element).html();
	$(element).removeAttr('onclick');
	$(element).hide();
	var td = $(element).parent();
	var editText = $('<textarea rows="5" cols="50" charswidth="23" class="emp_remarks" style="margin-top:1%;width:100%;margin-bottom:5%;resize:vertical;background:#fff;">');
	editText.attr('style', 'box-sizing:content-box;margin-top:5px;');
	td.append(editText);
	editText.attr("onclick", "this.focus()");
	editText.focus(function() {
		$(this).val(currentValue);
	});
	editText.focus();
	editText.keydown(function(e) {
		if (e.which == 13) { // Enter
			if (editText.val() != value && editText.val().trim().length > 0) {
				updateRevScoreOrRemarks(empId,'remarks',editText.val(),revId,cycleId);
				$(element).show();
				$(element).removeAttr('title');
				$(element).attr('title', editText.val());
				$(element).attr('onclick', 'InlineEditRevRemarks('+ empId +',this, \''+editText.val()+'\','+revId+','+cycleId+')');
				$(element).html(editText.val());
				editText.unbind("focusout");
				editText.remove();
			}
		} else if (e.which == 27) {
			editText.unbind("focusout");
			editText.remove();
			$(element).show();
			$(element).val(value);
			$(element).attr('onclick', 'InlineEditRevRemarks(' + empId + ',this, \''+editText.val()+'\','+revId+','+cycleId+')');
		}
	});

	editText.focusout(function() {
		editText.remove();
		$(element).show();
		$(element).attr('onclick', 'InlineEditRevRemarks(' + empId + ',this, \''+editText.val()+'\','+revId+','+cycleId+')');
	});
}


function mapEmployeeWithReviewerView(){
	$('#adminDashboardContentArea').show();
	$('#adminDashboardContentArea').html('');
	$('#actionContainer').hide();
	$('#createNewCycelContainer').hide();
	var title = "Assign Reviewer";
	var icon = $('<i class="fa fa-user" style="color:#18A689;margin-right:1%;"></i>');
	var titleDiv = setHeaderOfAvailAction(title,icon);
	var mappingContainter = $('<div class="col-sm-12">');
	var tableContainer = $('<div class="table-responsive">');
	var table = $('<table class="table">');
	var thead = $('<thead>');
	var tr = $('<tr>');
    var no = $('<th style="text-align:center;padding-right:22%;">').html('');
    var reviewerName = $('<th style="text-align:center;">').html('Reviewer Name');
	var blankTh = $('<th style="text-align:left;">').html('');
    var employeeName = $('<th style="text-align:center;padding-left:2%; ">').html('Employee Name');
    var action = $('<th style="text-align:left;padding-left:12%;">').html('Action');
	tr.append(no);
	tr.append(employeeName);
	tr.append(blankTh);
	tr.append(reviewerName);
	tr.append(action);
	thead.append(tr);
	var tbody = prepareBodyForRevMappingView();
	table.append(thead);
	table.append(tbody);
	mappingContainter.append(table);
	$('#adminDashboardContentArea').append(titleDiv);
	$('#adminDashboardContentArea').append(mappingContainter);
	initializeReviewerDropdown();
	initializeEmployeeDropdown();
	
}

function mapHRAdminForReviewerLevel2View(){
	$('#adminDashboardContentArea').show();
	$('#adminDashboardContentArea').html('');
	$('#actionContainer').hide();
	$('#createNewCycelContainer').hide();
	var title = "Assign Admin";
	var icon = $('<i class="fa fa-user" style="color:#18A689;margin-right:1%;"></i>');
	var titleDiv = setHeaderOfAvailAction(title,icon);
	var mappingContainter = $('<div class="col-sm-12">');
	var tableContainer = $('<div class="table-responsive">');
	var table = $('<table class="table">');
	var thead = $('<thead>');
	var tr = $('<tr>');
    var no = $('<th style="text-align:left;padding-left:1%;">').html('#');
    var HRAdminName = $('<th style="text-align:center;">').html('HR Admin Name');
	var blankTh = $('<th style="text-align:left;">').html('');
    var Reviewerlevel_2_Name = $('<th style="text-align:center;padding-right:22%;">').html('Reviewer Level-2 Name');
    var action = $('<th style="text-align:left;padding-left:1%;">').html('Action');
	tr.append(no);
	tr.append(HRAdminName);
	tr.append(blankTh);
	tr.append(Reviewerlevel_2_Name);
	tr.append(action);
	thead.append(tr);
	var tbody = prepareBodyForHRrevMappingView();
	table.append(thead);
	table.append(tbody);
	mappingContainter.append(table);
	$('#adminDashboardContentArea').append(titleDiv);
	$('#adminDashboardContentArea').append(mappingContainter);
	initializeHRAdminDropdown();
	initializeReviewerDropdown();
	checkBackButton()
}


function prepareBodyForRevMappingView(){
	var aboveConsultantDataMap = adminCache.getAboveConsulantEmployee();
	var allEmployeeDataMap = adminCache.getAllActiveMembers();
	var tbody = $('<tbody>');
	
	if(aboveConsultantDataMap != undefined && aboveConsultantDataMap != null && !jQuery.isEmptyObject(aboveConsultantDataMap) && 
			allEmployeeDataMap != undefined && allEmployeeDataMap != null && !jQuery.isEmptyObject(allEmployeeDataMap)){
		var count = "";
			var tr = $('<tr>');
			var noLabel = $('<label class="label label-success" style="background:#18A689;">').html(count);
			var noTd = $('<td>').append(noLabel);  
			var iconTd = $('<td style="text-align:left;width:20%;">');
			var icon = $('<i class="fa fa-arrows-h fa-2x" style="color:#18A689;">');
			iconTd.append(icon);
			var reviewerTd = $('<td style="width:10%;">');
			var reviewerDropdown = $('<select id="revDropdown">');
			var employeeTd = $('<td style="width:40%; text-align:center">');
		    var empDropdown = $('<select multiple="multiple" id="empDropdown" class="input-box">');
			var mapButtonTd = $('<td style="width:40%;text-align:center">');
			var mapButton = $('<button onclick="mapSelectedEmpwithReviewerAjax()" class="btn btn-outline-green btn-success" > Map </button>');
			employeeTd.append(empDropdown);
			reviewerTd.append(reviewerDropdown);
			mapButtonTd.append(mapButton);
			tr.append(noTd);
			tr.append(employeeTd);
			tr.append(iconTd);
			tr.append(reviewerTd);
			tr.append(mapButtonTd);
			tbody.append(tr);
		
	}else{
		var tr = $('<tr>').html('No Data Available');
		tbody.append(tr);
	}
	return tbody;
}


function prepareBodyForHRrevMappingView(){
	
	var aboveConsultantDataMap = adminCache.getAboveConsulantEmployee();
	var HRAdminDataMap = adminCache.getHRAdminMembers();
	var tbody = $('<tbody>');
	;
	if(aboveConsultantDataMap != undefined && aboveConsultantDataMap != null && !jQuery.isEmptyObject(aboveConsultantDataMap) && 
			HRAdminDataMap != undefined && HRAdminDataMap != null && !jQuery.isEmptyObject(HRAdminDataMap)){
		var count = "";
			var tr = $('<tr>');
			var noLabel = $('<label class="label label-success" style="background:#18A689;">').html(count);
			var noTd = $('<td>').append(noLabel);  
			var iconTd = $('<td style="text-align:center;width:40%;">');
			var icon = $('<i class="fa fa-arrows-h fa-2x" style="color:#18A689;">');
			iconTd.append(icon);
			var hrAdminTd = $('<td style="width:10%;">');
			var hrAdminDropdown = $('<select id="hrAdminDropdown">');
			var reviewerTd = $('<td style="width:40%;">');
		    var revDropdown = $('<select multiple="multiple" id="revDropdown" class="input-box">');
			var mapButtonTd = $('<td>');
			var mapButton = $('<button onclick="mapSelectedRevWithHRAdminAjax()" class="btn btn-outline-green btn-success" > Map </button>');
							
			hrAdminTd.append(hrAdminDropdown);
			reviewerTd.append(revDropdown);
			mapButtonTd.append(mapButton);
			tr.append(noTd);
			tr.append(hrAdminTd);
			tr.append(iconTd);
			tr.append(reviewerTd);
			tr.append(mapButtonTd);
			tbody.append(tr);
		
	}else{
		var tr = $('<tr>').html('No Data Available');
		tbody.append(tr);
	}
	return tbody;
}



function initializeEmployeeDropdown(){
	var aboveConsultantDataMap = adminCache.getAboveConsulantEmployee();
	var allEmployeeDataMap = adminCache.getAllActiveMembers();
	
	var activeEmployeeList = getListOfActiveEmployess(allEmployeeDataMap);
	for(var empId in allEmployeeDataMap){
		setDataInEmployeeDropdown(activeEmployeeList);    
	}
	$('#empDropdown').multiselect({
        
        includeSelectAllOption: true,
        numberDisplayed: 4,
        // enableCaseInsensitiveFiltering: true,
        buttonWidth:'200px'
         
       /*
		 * onChange: function (element, checked) { var items =
		 * $('#empDropdown_'+empId+ 'option:selected').val(); }
		 */ });	
}

function initializeReviewerDropdown(){
	var aboveConsultantDataMap = adminCache.getAboveConsulantEmployee();
	var activeReviewerList = getListOfActiveReviewer(aboveConsultantDataMap);
		setDataInReviewerDropdown(activeReviewerList);
	
	 $('#revDropdown').multiselect({
	            
	            includeSelectAllOption: false,
	            numberDisplayed: 2,
	            buttonWidth:'200px'
	        });
		
}

function initializeHRAdminDropdown(){
	var HRAdminDataMap = adminCache.getHRAdminMembers();
	var activeHRAdminList = getListOfHRAdmin(HRAdminDataMap);
		setDataInHRAdminDropdown(activeHRAdminList);
	
	 $('#hrAdminDropdown').multiselect({
	            
	            includeSelectAllOption: false,
	            numberDisplayed:2,
	            buttonWidth:'200px'
	        });
		
}


function setDataInEmployeeDropdown(activeEmployeeList){
	var selectBox = $('#empDropdown')
	// selectBox.html(new Option("Select employees", "", null, null));
    if(activeEmployeeList != undefined && activeEmployeeList != null && activeEmployeeList.length > 0){
    	for (var i = 0; i < activeEmployeeList.length; i++) {
    		selectBox.append(new Option(activeEmployeeList[i].name , activeEmployeeList[i].id , null, null));
    	}
    }
}

function setDataInReviewerDropdown(activeReviewerList){
	var selectBox = $('#revDropdown')
    if(activeReviewerList != undefined && activeReviewerList != null && activeReviewerList.length > 0){
    	for (var i = 0; i < activeReviewerList.length; i++) {
    		selectBox.append(new Option(activeReviewerList[i].name , activeReviewerList[i].id , null, null));
    	}
    }
}

function setDataInHRAdminDropdown(activeHRAdminList){
	var selectBox = $('#hrAdminDropdown')
	
    selectBox.html(new Option("None selected", "", null, null));
    if(activeHRAdminList != undefined && activeHRAdminList != null && activeHRAdminList.length > 0){
    	for (var i = 0; i < activeHRAdminList.length; i++) {
    		selectBox.append(new Option(activeHRAdminList[i].name , activeHRAdminList[i].id , null, null));
    	}
    }
}

function getObjectNameAndId(activeEmployeeList){
    var objects = [];
	for (var i = 0; i < activeEmployeeList.length; i++) {
		var object = {};
		object.name = activeEmployeeList[i].name;
		object.id = activeEmployeeList[i].id;
		objects.push(object);
	}
	return objects;    
}
function getObjectNameAndId(activeReviewerList){
    var objects = [];
	for (var i = 0; i < activeReviewerList.length; i++) {
		var object = {};
		object.name = activeReviewerList[i].name;
		object.id = activeReviewerList[i].id;
		objects.push(object);
	}
	return objects;    
}

function getListOfActiveEmployess(allEmployeeDataMap){
	var activeEmpList = [];
	if(allEmployeeDataMap != undefined && allEmployeeDataMap != null && !jQuery.isEmptyObject(allEmployeeDataMap)){
		 for(var activeEmpId in allEmployeeDataMap){
			 var obj = {};
			 obj['id'] = activeEmpId;
			 obj['name'] = allEmployeeDataMap[activeEmpId];
			 activeEmpList.push(obj);
		 }
	}
	return activeEmpList;
}

function getListOfActiveReviewer(aboveConsultantDataMap){
	var activeRevList = [];
	if(aboveConsultantDataMap != undefined && aboveConsultantDataMap != null && !jQuery.isEmptyObject(aboveConsultantDataMap)){
		 for(var activeRevId in aboveConsultantDataMap){
			 var obj = {};
			 obj['id'] = activeRevId;
			 obj['name'] = aboveConsultantDataMap[activeRevId];
			 activeRevList.push(obj);
		 }
	}
	return activeRevList;
}

function getListOfHRAdmin(HRAdminDataMap){
	
	var activeHRAdminList = [];
	if(HRAdminDataMap != undefined && HRAdminDataMap != null && !jQuery.isEmptyObject(HRAdminDataMap)){
		 for(var activeRevId in HRAdminDataMap){
			 var obj = {};
			 obj['id'] = activeRevId;
			 obj['name'] = HRAdminDataMap[activeRevId];
			 activeHRAdminList.push(obj);
		 }
	}
	return activeHRAdminList;
}
function setHeaderOfAvailAction(title,icon){
	var headerDiv = $('<div class="col-sm-12" style="padding-left:2%;font-size:20px;margin-bottom:1%;margin-top:0%;border-bottom:solid 3px #eee;padding-bottom:0.5%;">');
    var label = $('<label style="width:50%;color:#18A689;">');
    label.html(title);
    headerDiv.append(icon);
    headerDiv.append(label);
    return headerDiv;
}

function setHeaderOfAvailActionExport(title,icon,exportButtonTd){
	var headerDiv = $('<div class="col-sm-12" style="padding-left:2%;font-size:20px;margin-bottom:1%;margin-top:0%;border-bottom:solid 3px #eee;padding-bottom:0.5%;">');
    var label = $('<label style="width:50%;color:#18A689;">');
    label.html(title);
    headerDiv.append(icon);
    headerDiv.append(label);
    headerDiv.append(exportButtonTd);
    return headerDiv;
}

function setHeaderOfAvailActionProgress(title,icon,button){
	var headerDiv = $('<div class="col-sm-12" style="padding-left:2%;font-size:20px;margin-bottom:1%;margin-top:0%;border-bottom:solid 3px #eee;padding-bottom:0.5%;">');
	   var label = $('<label style="width:50%;color:#18A689;">');
	   label.html(title);
	   headerDiv.append(icon);
	   headerDiv.append(label);
	   headerDiv.append(button);
	   return headerDiv;
	}

function showEmailBox(empId){
	
    $('#emailSubject').val('');
    $('#configMailtext').html('');
    $('#empId').val(empId);
    $('.configMailSummerNote').summernote({focus: true});
    $('#configMailform').find('.note-insert').hide();
    $('#configMailModal').modal('show');
}


/**
 * ****************************************************************************
 * AJAX
 * *************************************************************************************
 */

function fetchEmployeeProgressDataAjax(){
	var res = null;
	$.ajax({
		type : "POST",
		url : fetchEmpProgressURL,
		async : false,
		data : {},
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
			res = eval(response);
			if (res.status) {
				 showToster('Success !', "Employee progress report generated successfully !", 5, "success");
			     data = eval(res);
			     adminCache.empProgressMap = data.empData; 
			} else {
				showToster('Error !',"Oops ! Something went wrong.", 5, "error");
				console.log('Error Cause :' +res.errorMessage);
			}
		}
	});
	return res;
}


function createNewCycleAjax(){
	var res = null;
	var cycleDataMap = getDataOfNewCycle();
	var map = JSON.stringify([...cycleDataMap]);
	$.ajax({
		type : "POST",
		url : createNewCycleURL,
		async : false,
		data : {
			cycleMap : map
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
			res = eval(response);
			if (res.status) {
				 if (!mandatoryField(cycle_title, "Cycle Title")) {
					 cycle_title.focus();
					 return false;
					 }
					 showToster('Success !', " Created Successfully!", 5, "success");
					 data = eval(res);
					 apprCycle = data.runningCycel; 
					 totalCycles = data.totalCycles;
					 showAdminDashboard();
					 showToster('info !', " Start sending emails", 5, "success");
					 clearCycleForm();
					 sendEmailToAll(); // TODO mail send to all at the
						// time of cycle creation.
			} else {
				showToster('Error !',"Oops ! Something went wrong.", 5, "error");
				console.log('Error Cause :' + res.errorMessage);
			}
		}
	});
	return res;
}

function updateCycleAjax(){
	var res = null;
	var extendedCycleDataMap = getDataOfExtendedCycle();
	var map = JSON.stringify([...extendedCycleDataMap]);
	var cycleId = apprCycle.cycleId;
	$.ajax({
		type : "POST",
		url : updateCycleURL,
		async : false,
		data : {
			extendedCycleDataMap : map,
			cycleId : cycleId
			
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
			res = eval(response);
			if (res.status) {
					 showToster('Success !', " Dates Extended Successfully!", 5, "success");
					 data = eval(res);
					 apprCycle = data.runningCycel; 
					 totalCycles = data.totalCycles;
					 showAdminDashboard();
					 // showToster('info !', " Start sending emails", 5,
						// "success");
					 ClearExtendedDatesForm();
			} else {
				showToster('Error !',"Oops ! Something went wrong.", 5, "error");
				console.log('Error Cause :' + res.errorMessage);
			}
		}
	});
	return res;
}


function fetchEmpMetricSheetDataAjax(){
	
	var res = null;
	$.ajax({
		type : "POST",
		url : generateEmpMetricSheetURL,
		async : false,
		data : {},
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
			res = eval(response);
			if (res.status) {
				 showToster('Success !', "Metric sheet rendered successfully!", 5, "success");
			     data = eval(res);
			     adminCache.metricSheetDataMap = data.empMetricSheetData; 
			} else {
				showToster('Error !',"Oops! Something went wrong.", 5, "error");
				console.log('Error Cause :' + res.errorMessage);
			}
		}
	});
	return res;
}

function getExportDataAjax(){
	
	var res = null;
	$.ajax({
		type : "POST",
		url : generateExportedDataURL,
		async : false,
		data : {},
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
			res = eval(response);
			if (res.status) {
				 showToster('Success !', "Data sheet Exported successfully!", 5, "success");
			     data = eval(res);
			     adminCache.exportDataMap = data.exportDataMap; 
			} else {
				showToster('Error !',"Oops! Something went wrong.", 5, "error");
				console.log('Error Cause :' + res.errorMessage);
			}
		}
	});
	return res;
}

function sendEmailToAll(){
	var res = null;
	$.ajax({
		type : "POST",
		url : sendEmailToAllURL,
		async : true,
		data : {},
		error : function(response, error, thrownError) {
			displayError(response, error, thrownError);
		},
		success : function success(response) {
			res = eval(response);
			if (res.status) {
				 showToster('Success !', "Email sent successfully !", 5, "success");
			} else {
				showToster('Error !',"Oops! Something went wrong.", 5, "error");
				console.log('Error Cause :' + res.errorMessage);
			}
		}
	});
	return res;
}

function sendMailToSpecificEmp(){
	
	var data =  $('.configMailSummerNote').code()
	   $('#configMailtext').html(data);
	var empIdForMail = $("#empId").val();
	var subjectForMail = $("#emailSubject").val();
	var configMailtext = $("configMailtext").text();
	// var dataStringForMail =
	// "empId="+empIdForMail+"&subject="+subjectForMail+"&configMailtext="+configMailtext+"";*/
	   $.ajax({
	       type : "POST",
	       url : sendEmailToSingleEmpURL,
	       data : {
	empId : $("#empId").val(),
	subject : $("#emailSubject").val(),
	message :  data
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
	           var res = eval(response);
	           if (res.status) {
	                   showToster("Success", "Email has been sent successfully.", 5, 'success');
	                   $('.configMailSummerNote').destroy();
	                   $('#configMailModal').modal('hide');
	           } else {
	               showToster('Error !', res.errorMessage, 5, "error");
	           }
	       }
	   });
	}




function updateRevScoreOrRemarks(empId,flag,value,revId,cycleId){
	var res = null;
		$.ajax({
		type : "POST",
		url : updateRevScoreAndRemarksURL,
		async : false,
		data : {
			empId : empId,
			flag : flag,
			value : value,
			revId : revId,
			cycleId : cycleId
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
			res = eval(response);
			if (res.status) {
				 showToster('Success !', "updated successfully !", 5, "success");
				 adminCache.metricSheetDataMap = data.updatedMetricSheetMap;
			} else {
				showToster('Error !',"Oops! Something went wrong.", 5, "error");
				console.log('Error Cause :' + res.errorMessage);
			}
		}
	});
	return res;
}

function getHRAdminMembersAjax(){
	var res = null;
	$.ajax({
		type : "POST",
		url : getHRAdminMemberURL,
		async : false,
		data : {},
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
			res = eval(response);
			if (res.status) {
				 showToster('Success !', "Mapping view successfully rendered!", 5, "success");
				 data = eval(res);
				 adminCache.hrAdminMap = data.hrAdminMemberMap;   
				 adminCache.activeEmployeeMap = data.activeProfile;
			} else {
				showToster('Error !',"Oops! Something went wrong.", 5, "error");
				console.log('Error Cause :' + res.errorMessage);
			}
		}
	});
	return res;	
}
function getAllActiveAndAboveConsultantEmployeesAjax(){
	var res = null;
	$.ajax({
		type : "POST",
		url : getActiveAndAboveConsulantEmpURL,
		async : false,
		data : {},
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
			res = eval(response);
			if (res.status) {
				 showToster('Success !', "Mapping view successfully rendered!", 5, "success");
				 data = eval(res);
				 adminCache.aboveConsultantEmployeeMap = data.aboveConsultantMap;   
				 adminCache.activeEmployeeMap = data.activeProfile;
			} else {
				showToster('Error !',"Oops! Something went wrong.", 5, "error");
				console.log('Error Cause :' + res.errorMessage);
			}
		}
	});
	return res;
}

function mapSelectedEmpwithReviewerAjax(){
	var empList = $('#empDropdown').val();
	var revId = $('#revDropdown').val();
	console.log(revId);
	
	$.ajax({
		type : "POST",
		url : mapEmployeeWithReviewerURL,
		async : false,
		data : {
			empList : JSON.stringify(empList),
			revId : revId
		},
		/*
		 * beforeSend : function() { $("body").showLoading(); }, complete :
		 * function() { $("body").hideLoading(); },
		 */
		error : function(response, error, thrownError) {
			displayError(response, error, thrownError);
		},
		success : function success(response) {
			res = eval(response);
			if (res.status) {
				 showToster('Success !', "Successfully Mapped!", 5, "success");
			     data = eval(res);
			     var employeeList = data.mappedEmployeeList;
			     adminCache.mappingContainer.set(revId,employeeList);
			} else {
				showToster('Error !',"Oops ! Something went wrong.", 5, "error");
				console.log('Error Cause :' + res.errorMessage);
			}
		}
	});
	return res;
}


function mapSelectedRevWithHRAdminAjax(){
	var hrAdminID = $('#hrAdminDropdown').val();
	var revIdList = $('#revDropdown').val();
	console.log(revIdList);
	
	$.ajax({
		type : "POST",
		url : mapReviewerWithHRAdminURL,
		async : false,
		data : {
			hrAdminID : hrAdminID,
			revIdList : JSON.stringify(revIdList)	
		},
		
		error : function(response, error, thrownError) {
			displayError(response, error, thrownError);
		},
		success : function success(response) {
			res = eval(response);
			if (res.status) {
				 showToster('Success !', "Successfully Mapped!", 5, "success");
			     data = eval(res);
			     var reviewerList = data.mappedReviewerList;
			     adminCache.mappingContainer.set(hrAdminID,reviewerList);
			} else {
				showToster('Error !',"Oops ! Something went wrong.", 5, "error");
				console.log('Error Cause :' + res.errorMessage);
			}
		}
	});
	return res;
}

function fetchCheckedEmpListFromViewPogress(checks){
	
	var list = JSON.stringify([...checks]);
	   $.ajax({
	       type : "POST",
	       url : fetchEmpProgressCheckedEmpListURL,
	       data : {
	    	   empList : list
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
	           var res = eval(response);
	           if (res.status) {
	                   showToster("Success", "Email has been sent successfully.", 5, 'success');
	                   $('.configMailSummerNote').destroy();
	                   $('#configMailModal').modal('hide');
	           } else {
	               showToster('Error !', res.errorMessage, 5, "error");
	           }
	       }
	   });
	}


/**
 * ****************************************************************************
 * AJAX
 * *************************************************************************************
 */

function cycleDatesValidations() {
	
	var date = new Date();
	var startDate = new Date();
	var endDate=new Date();
	date.setDate(date.getDate());
	
	$('#cycleStartDate').datepicker({
		autoclose : true,
		todayHighlight : true,
		format : 'dd-mm-yyyy',
		startDate : date	
	}).on('changeDate', function(){
		var temp = $(this).datepicker('getDate');
		var d = new Date(temp);
		d.setDate(d.getDate()+1);
		
	$('#cycleEndDate').datepicker({
		autoclose : true,
		todayHighlight : true,
		format : 'dd-mm-yyyy',
		startDate : d
		
	}).on('changeDate', function() {
	        var temp1 = $(this).datepicker('getDate');
	        endDate=new Date(temp1);  
	})
	});		
	$('#cycleStartDate').datepicker().on('changeDate', function() {
		var temp = $(this).datepicker('getDate');
		var d = new Date(temp);
		d.setDate(d.getDate());
			
	$('#selfApprStartDate').datepicker({
			autoclose : true,
			format : 'dd-mm-yyyy',
			startDate : d,
			// endDate:endDate
	}).on('changeDate', function() {
		var temp1 = $(this).datepicker('getDate');
		var d1 = new Date(temp1);
		d1.setDate(d1.getDate() + 1);
		
		$('#selfApprEndDate').datepicker({
			
			autoclose : true,
			format : 'dd-mm-yyyy',
			startDate : d1,
			endDate:endDate
		})
	})
	
	$('#selfApprStartDate').datepicker().on('changeDate', function() {
		var temp = $(this).datepicker('getDate');
		var d = new Date(temp);
		d.setDate(d.getDate() + 1);
			
	$('#mngApprStartDate').datepicker({
			autoclose : true,
			format : 'dd-mm-yyyy',
			startDate : d,
			endDate:endDate
	}).on('changeDate', function() {
		var temp1 = $(this).datepicker('getDate');
		var d1 = new Date(temp1);
		d1.setDate(d1.getDate() + 1);
		
		$('#mngApprEndDate').datepicker({
			
			autoclose : true,
			format : 'dd-mm-yyyy',
			startDate : d1,
			endDate:endDate
		})
	})
	$('#mngApprStartDate').datepicker().on('changeDate', function() {
		var temp = $(this).datepicker('getDate');
		var d = new Date(temp);
		d.setDate(d.getDate() + 1);
			
	$('#revApprStartDate').datepicker({
			autoclose : true,
			format : 'dd-mm-yyyy',
			startDate : d,
			endDate:endDate
	}).on('changeDate', function() {
		var temp1 = $(this).datepicker('getDate');
		var d1 = new Date(temp1);
		d1.setDate(d1.getDate() + 1);
		
		$('#revApprEndDate').datepicker({
			
			autoclose : true,
			format : 'dd-mm-yyyy',
			startDate : d1,
			endDate:endDate
		})
	})
	});
	});
	});
	
}


function cycleDatesValidationsForExtendDates() {
	
	var date = new Date();
	var startDate = new Date();
	var endDate=new Date();
	date.setDate(date.getDate());
	
	$('#extendCycleEndDate').datepicker({
		autoclose : true,
		todayHighlight : true,
		format : 'yyyy-mm-dd',
		startDate : date	
	}).on('changeDate', function(){
		var temp = $(this).datepicker('getDate');
		var d = new Date(temp);
		d.setDate(d.getDate()+1);
	});	
	$('#extendSelfApprEndDate').datepicker({
		autoclose : true,
		todayHighlight : true,
		format : 'yyyy-mm-dd',
		startDate : date,
	}).on('changeDate', function(){
		var temp = $(this).datepicker('getDate');
		var d = new Date(temp);
		d.setDate(d.getDate()+1);

	});	
	
	$('#extendMngApprEndDate').datepicker({
		autoclose : true,
		todayHighlight : true,
		format : 'yyyy-mm-dd',
		startDate : date,
	}).on('changeDate', function(){
		var temp = $(this).datepicker('getDate');
		var d = new Date(temp);
		d.setDate(d.getDate()+1);

	});	
	$('#extendRevApprEndDate').datepicker({
		autoclose : true,
		todayHighlight : true,
		format : 'yyyy-mm-dd',
		startDate : date,
	}).on('changeDate', function(){
		var temp = $(this).datepicker('getDate');
		var d = new Date(temp);
		d.setDate(d.getDate()+1);

	});	
	
}



function mandatoryField(fieldObject, fieldName) {
	if ("" == fieldObject.value) {
	showToster('Warning !',"Please enter " + fieldName, 5, "warning");
	return false;
	} else
	return true;
	}
function clearCycleForm() {

	$("#cycle_title").val("");
	$("#cycleStartDate").val("");
	$("#cycleEndDate").val("");
	$("#selfApprStartDate").val("");
	$("#selfApprEndDate").val("");
	$("#mngApprStartDate").val("");
	$("#mngApprEndDate").val("");
	$("#revApprStartDate").val("");
	$("#revApprEndDate").val("");
}
function ClearDates() {
	$('#cycleStartDate').val('').datepicker('remove');
	$('#cycleEndDate').val('').datepicker('remove');
	$('#selfApprStartDate').val('').datepicker('remove');
	$('#selfApprEndDate').val('').datepicker('remove');
	$('#mngApprStartDate').val('').datepicker('remove');
	$('#mngApprEndDate').val('').datepicker('remove');
	$('#revApprStartDate').val('').datepicker('remove');
	$('#revApprEndDate').val('').datepicker('remove');
	cycleDatesValidations(); 
	}


function ClearExtendedDates() {
	$('#extendCycleEndDate').val('').datepicker('remove');
	$('#extendSelfApprEndDate').val('').datepicker('remove');
	$('#extendMngApprEndDate').val('').datepicker('remove');
	$('#extendRevApprEndDate').val('').datepicker('remove');
	cycleDatesValidationsForExtendDates(); 
	}

function ClearExtendedDatesForm() {
	$('#extendCycleEndDate').val('').datepicker('remove');
	$('#extendSelfApprEndDate').val('').datepicker('remove');
	$('#extendMngApprEndDate').val('').datepicker('remove');
	$('#extendRevApprEndDate').val('').datepicker('remove');
	cycleDatesValidationsForExtendDates(); 
	}


function CycleNameCheck()
{
var $temp = $('#currentCycleName').html();
showToster('Info !',"Current cycle is "+ $temp +". Create another on", 5, "info");
}
function mandatoryField(fieldObject, fieldName) {
	if ("" == fieldObject.value) {
		showToster('Warning !',"Please enter " + fieldName, 5, "warning");
		return false;
	} else
		return true;
}


function SubmitCheckedEmpID(){
var checks = $('input[type="checkbox"]:checked').map(function(){
       return $(this).val();
   }).get()
   if(checks.length!=0){
	   fetchCheckedEmpListFromViewPogress(checks);	   
   }
   else{
	   showToster('Warning !',"Please select atleat 1 entry ", 5, "warning");
   }
clearCheckBox();
}


function checkBackButton(){
	if($("#actionContainer").css('display')=="block"){
	$("#crossAndBack").children()[1].remove()
	}
	else{
	var backButton = $('<button onclick="backToDashboard();" class="btn btn-circle btn-close pull-right" style="margin-left:1%;" data-toggle="tooltip" data-placement="bottom" title="Back"><i class="fa fa-mail-reply-all" style="margin-right:1%;font-size:11px;"></i></button>')
	   $("#crossAndBack").append(backButton);
	}
	}
function clearCheckBox(){
	  $(':checkbox').each(function(i,item){ 
	    this.checked = item.defaultChecked; 
	  }); 
	}

function exportDataAjax(){
	
	$("#exportTableId").table2excel({
        filename: "EmployeeRatingSheet.xls"
    });
}