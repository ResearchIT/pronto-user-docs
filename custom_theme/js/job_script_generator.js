/*****************************************************************\

Copyright (C) 2014, Brigham Young University

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.

*******************************************************************

Available at: https://github.com/BYUHPC/BYUJobScriptGenerator

Author:  Ryan Cox <ryan_cox@byu.edu>

This script generator was originally created for Brigham Young University and
is tailored to its specific needs and configuration.  It is unlikely that this
script will work for you without modification since there are many, many ways
to configure a job scheduler.

This should integrate easily into any existing website.  Use CSS for styling.

TODO:
	job arrays
	tooltip/help for each parameter row

\*****************************************************************/



var BYUScriptGen = function(div) {
	this.values = {};
	this.containerDiv = div;
	this.inputs = {};
	this.inputs.acceptable_gpus = {};
	this.formrows = [];
	this.settings = {
		// script_formats = [ ["htmlname1", "Text1"], ["htmlname2", "Text2"], ... ]
		script_formats : [ ["slurm", "Slurm"] ], // first is default
		defaults : {
			email_address : "myemail@example.com", //example.com should be blackholed
		},
		qos : {
			preemptable : "standby",
			test : "test"
		},
		/* You may want to dynamically generate features/partitions. See example HTML file */
		acceptable_gpus : {},
		acceptable_gpus_status : {},
		partitions : {},
		partitions_status : {},
	};
	return this;
};

BYUScriptGen.prototype.returnNewRow = function (rowid, name, input_element) {
	var dt, dd, wrapper;
	dt = document.createElement("dt");
	dd = document.createElement("dd");
	wrapper = document.createElement("div");
	dt.id = rowid + "_left";
	dd.id = rowid + "_right";
	wrapper.id = rowid;
	dt.innerHTML = name;
	dd.appendChild(input_element)
	wrapper.appendChild(dt);
	wrapper.appendChild(dd);
	return wrapper;
}

BYUScriptGen.prototype.newCheckbox = function(args) {
	var tthis = this;
	var newEl = document.createElement("input");
	newEl.type = "checkbox";
	var formrows = this.formrows;
	if(args.checked)
		newEl.checked = true;

	newEl.onclick = newEl.onchange = function () {
		if (args.toggle) {
			formrows[args.toggle].style.display = newEl.checked ? "" : "none";
		}
		if (args.antitoggle) {
			formrows[args.antitoggle].style.display = newEl.checked ? "none" : "";
		}
		tthis.updateJobscript();
	};
	return newEl;
}

BYUScriptGen.prototype.newInput = function(args) {
	var tthis = this;
	var newEl = document.createElement("input");
	newEl.type = "text";
	if(args.size)
		newEl.size = args.size;
	if(args.maxLength)
		newEl.maxLength = args.maxLength;
	if(args.value)
		newEl.value = args.value;
	newEl.onclick = newEl.onchange = function () {
		tthis.updateJobscript();
	};
	return newEl;
}

BYUScriptGen.prototype.newSelect = function(args) {
	var tthis = this;
	var newEl = document.createElement("select");
	if(args.options) {
		for(var i in args.options) {
			var newOpt = document.createElement("option");
			newOpt.value = args.options[i][0];
			newOpt.text = args.options[i][1];
			if(args.selected && args.selected == args.options[i][0])
				newOpt.selected = true;
			newEl.appendChild(newOpt);
		}
	}
	newEl.onclick = newEl.onchange = function () {
		tthis.updateJobscript();
	};
	return newEl;
}

BYUScriptGen.prototype.newSpan = function() {
	var newEl = document.createElement("span");
	if(arguments[0])
		newEl.id = arguments[0];
	for (var i = 1; i < arguments.length; i++) {
		if(typeof arguments[i] == "string") {
			newEl.appendChild(document.createTextNode(arguments[i]));
		} else
			newEl.appendChild(arguments[i]);
	}
	return newEl;
};

BYUScriptGen.prototype.newDiv = function() {
	var newEl = document.createElement("div");
	if(arguments[0])
		newEl.id = arguments[0];
	for (var i = 1; i < arguments.length; i++) {
		if(typeof arguments[i] == "string") {
			newEl.appendChild(document.createTextNode(arguments[i]));
		} else
			newEl.appendChild(arguments[i]);
	}
	return newEl;
};


BYUScriptGen.prototype.newA = function(url, body) {
	var a = document.createElement("a");
	a.href = url;
	a.appendChild(document.createTextNode(body));
	a.target = "_base";
	return a;
}

BYUScriptGen.prototype.createForm = function(doc) {
	function br() {
		return document.createElement("br");
	}
	function newHeaderRow(text) {
		var header = document.createElement("h2");
		header.appendChild(document.createTextNode(text));
		return header;
	}

	var newEl;
	form = document.createElement("form");
	form.id = "byu_sg_input_container";
	var table = document.createElement("dl");
	form.appendChild(table);
	table.appendChild(newHeaderRow("Parameters"));

	//this.inputs.single_node = this.newCheckbox({checked:1});
	this.inputs.num_cores = this.newInput({value:1});
	this.inputs.num_gpus = this.newInput({value:1, size:1});
	this.inputs.max_mem = this.newInput({value:1, size:6});
	this.inputs.mem_units = this.newSelect({options:[["GB", "GB"],["MB", "MB"]]});
	this.inputs.runtimedays = this.newInput({value:"0", size:2});
	this.inputs.runtimehours = this.newInput({value:"1", size:3});
	this.inputs.runtimemins = this.newInput({value:"00", size:2, maxLength:2});
	this.inputs.runtimesecs = this.newInput({value:"00", size:2, maxLength:2});
	this.inputs.is_gpu_job = this.newCheckbox({checked:0,toggle:"gpu_stuff",antitoggle:"choose_partition"});
	// this.inputs.is_preemptable = this.newCheckbox({checked:0, toggle:"is_requeueable"});

	// this.inputs.is_requeueable = this.newCheckbox({checked:0});
	// this.inputs.in_group = this.newCheckbox({checked:0, toggle:"group_name"});
	// this.inputs.group_name = this.newInput({value:"MYGROUPNAME"});
	// this.inputs.need_licenses = this.newCheckbox({checked:0, toggle:"licenses"});

	// this.inputs.lic0_name = this.newInput({});
	// this.inputs.lic0_count = this.newInput({size:3, maxLength:4});
	// this.inputs.lic1_name = this.newInput({});
	// this.inputs.lic1_count = this.newInput({size:3, maxLength:4});
	// this.inputs.lic2_name = this.newInput({});
	// this.inputs.lic2_count = this.newInput({size:3, maxLength:4});
	this.inputs.job_name = this.newInput({});
	this.inputs.email_begin = this.newCheckbox({checked:0});
	this.inputs.email_end = this.newCheckbox({checked:0});
	this.inputs.email_abort = this.newCheckbox({checked:0});
	this.inputs.email_address = this.newInput({value:this.settings.defaults.email_address});


	table.appendChild(this.returnNewRow("byu_sg_row_gpu_job", "Is this a GPU job?", this.inputs.is_gpu_job));

	this.inputs.acceptable_gpus = [];
	var acceptable_gpus_span = this.newSpan("byu_sg_input_acceptable_gpus");
	for(var i in this.settings.acceptable_gpus.names) {
		var new_checkbox = this.newCheckbox({checked:1});
		new_checkbox.gpu_name = this.settings.acceptable_gpus.names[i];
		this.inputs.acceptable_gpus.push(new_checkbox);
		var url = this.newA("/guides/pronto/hardware/#gpu-types", "?");
		var acceptable_gpu_container = this.newSpan(null);
		acceptable_gpu_container.className = "byu_sg_input_acceptable_gpu_container";
		var name_span = this.newSpan("byu_sg_input_acceptable_gpu_" + new_checkbox.gpu_name, new_checkbox, this.settings.acceptable_gpus.names[i] + " [", url, "]");
		name_span.className = "byu_sg_input_acceptable_gpu_name";
		acceptable_gpu_container.appendChild(name_span);
		if(this.settings.acceptable_gpus_status && this.settings.acceptable_gpus_status[this.settings.acceptable_gpus.names[i]]) {
			var gpu_type_status = this.settings.acceptable_gpus_status[this.settings.acceptable_gpus.names[i]];
			acceptable_gpu_container.appendChild(
				this.newSpan(	null,
						"RAM: ",
						"" + gpu_type_status.ram,
						br(),
						"CC: ",
						"" + gpu_type_status.cc,
						br(),
						"Quantity: ",
						"" + gpu_type_status.quantity,
				)
			);
		}
		acceptable_gpus_span.appendChild(acceptable_gpu_container);
	}
	var acceptable_gpus = this.returnNewRow("byu_sg_input_acceptable_gpus", "Acceptable GPU Types", acceptable_gpus_span);

	var numgpus = this.returnNewRow("byu_sg_row_numgpus", "Number of GPUs", this.inputs.num_gpus);
	table.appendChild(this.formrows["gpu_stuff"] = this.newDiv(
		"byu_sg_gpu_stuff",
		numgpus,
		acceptable_gpus,
	));

	this.formrows["gpu_stuff"].style.display = "none";

	this.inputs.partitions = [];
	var partitions_span = this.newSpan("byu_sg_input_partitions");
	for(var i in this.settings.partitions.names) {
		var new_checkbox = this.newCheckbox({checked:0});
		new_checkbox.partition_name = this.settings.partitions.names[i];
		this.inputs.partitions.push(new_checkbox);
		var url = this.newA(this.settings.partitions.info_base_url + this.settings.partitions.names[i], "?");
		var partition_container = this.newSpan(null);
		partition_container.className = "byu_sg_input_partition_container";
		var name_span = this.newSpan("byu_sg_input_partition_" + new_checkbox.partition_name, new_checkbox, this.settings.partitions.names[i] + " [", url, "]");
		name_span.className = "byu_sg_input_partition_name";
		partition_container.appendChild(name_span);
		if(this.settings.partitions_status && this.settings.partitions_status[this.settings.partitions.names[i]]) {
			var partition_status = this.settings.partitions_status[this.settings.partitions.names[i]];
			partition_container.appendChild(
				this.newSpan(	null,
					"Max Cores: ",
					"" + partition_status.max_cores,
					br(),
					"Max RAM: ",
					partition_status.max_ram + "GB"
				)
			);
		}
		partitions_span.appendChild(partition_container);
	}
	this.formrows["choose_partition"] = this.returnNewRow("byu_sg_input_partitions", "Partitions", partitions_span)
	table.appendChild(this.formrows["choose_partition"]);

	//table.appendChild(this.returnNewRow("byu_sg_row_onenode", "Limit this job to one node", this.inputs.single_node));
	table.appendChild(this.returnNewRow("byu_sg_row_numcores", "Number of CPU cores", this.inputs.num_cores));





	table.appendChild(this.returnNewRow("byu_sg_row_maxmem", "Max Memory", this.newSpan(null, this.inputs.max_mem, this.inputs.mem_units)));
	table.appendChild(this.returnNewRow("byu_sg_row_jobruntime", "Max Job Runtime", this.newSpan(null, this.inputs.runtimedays, " days ", this.inputs.runtimehours, " hours ", this.inputs.runtimemins, " mins ", this.inputs.runtimesecs, " secs")));

	/*
	table.appendChild(this.formrows["is_requeueable"] = this.returnNewRow("byu_sg_row_requeueable", "Job is requeueable", this.inputs.is_requeueable));
	this.formrows["is_requeueable"].style.display = "none";
	table.appendChild(this.returnNewRow("byu_sg_row_fsgroup", "I am in a file sharing group and my group members need <br/>to read/modify my output files", this.inputs.in_group));
	table.appendChild(this.formrows["group_name"] = this.returnNewRow("byu_sg_row_fsgroupname", "Group name (case sensitive)", this.inputs.group_name));
	this.formrows["group_name"].style.display = "none";
	table.appendChild(this.returnNewRow("byu_sg_row_needlicenses", "Need licenses? ", this.inputs.need_licenses));
	table.appendChild(this.formrows["licenses"] = this.returnNewRow("byu_sg_row_licenses",
					"Licenses", this.newSpan(	null,
									"Name ", this.inputs.lic0_name, " Count ", this.inputs.lic0_count, br(),
									"Name ", this.inputs.lic1_name, " Count ", this.inputs.lic1_count, br(),
									"Name ", this.inputs.lic2_name, " Count ", this.inputs.lic2_count
								)
					)
	);
	this.formrows["licenses"].style.display = "none"; */
	table.appendChild(this.returnNewRow("byu_sg_row_jobname", "Job name", this.inputs.job_name));
	table.appendChild(this.returnNewRow("byu_sg_row_emailevents", "Receive email for job events",
				this.newSpan(	null,
						this.inputs.email_begin,
						" begin ",
						this.inputs.email_end,
						" end ",
						this.inputs.email_abort,
						" abort"
					    )
			 )
	);
	table.appendChild(this.returnNewRow("byu_sg_row_emailaddress", "Email address", this.inputs.email_address));




	return form;

}; /* end createForm() */

BYUScriptGen.prototype.retrieveValues = function() {
	var jobnotes = [];
	this.values.MB_per_core = Math.round(this.inputs.max_mem.value * (this.inputs.mem_units.value =="GB" ? 1024 : 1));

	this.values.acceptable_gpus = [];
	this.values.unacceptable_gpus = [];
	for(var i in this.inputs.acceptable_gpus) {
		if(this.inputs.acceptable_gpus[i].checked){
			this.values.acceptable_gpus.push(this.inputs.acceptable_gpus[i].gpu_name);
		} else {
			this.values.unacceptable_gpus.push(this.inputs.acceptable_gpus[i].gpu_name);
		}
	}

	this.values.partitions = [];
	for(var i in this.inputs.partitions) {
		if(this.inputs.partitions[i].checked){
			this.values.partitions.push(this.inputs.partitions[i].partition_name);
		} else {
		}
	}

	this.values.is_gpu_job = this.inputs.is_gpu_job.checked;
	// this.values.is_preemptable = this.inputs.is_preemptable.checked;
	// this.values.is_requeueable = this.inputs.is_requeueable && this.inputs.is_requeueable.checked;
	this.values.jobruntime_in_minutes = this.inputs.runtimedays.value * 86400 + this.inputs.runtimehours.value * 3600 + this.inputs.runtimemins.value * 60;
	this.values.num_cores = this.inputs.num_cores.value;
	// if(this.inputs.single_node.checked)
	// 	this.values.nodes = 1;
	this.values.gpus = this.inputs.num_gpus.value
	this.values.job_name = this.inputs.job_name.value;
	this.values.sendemail = {};
	this.values.sendemail.begin = this.inputs.email_begin.checked;
	this.values.sendemail.end = this.inputs.email_end.checked;
	this.values.sendemail.abort = this.inputs.email_abort.checked;
	this.values.email_address = this.inputs.email_address.value;

	/* Add warnings, etc. to jobnotes array */
	if(this.values.MB_per_core > 20*1024*1024)
		jobnotes.push("That is way too much RAM!");
	if(this.values.jobruntime_in_minutes > 86400*31)
		jobnotes.push("Global maximum jobruntime is 31 days");
	// if(this.values.jobruntime_in_minutes > 86400*3 && this.values.partitions.indexOf("p2") > -1)
	// 	jobnotes.push("Partition p2 maximum jobruntime is 3 days");
	// if(this.values.MB_per_core > 24*1024 && this.values.partitions.indexOf("p1") > -1)
	// 	jobnotes.push("Partition p1 nodes have 24 GB of RAM. You want more than that per core");

	this.jobNotesDiv.innerHTML = jobnotes.join("<br/>\n");
};

BYUScriptGen.prototype.generateScriptSLURM = function () {
	var pbscompat = true;
	var pmemmb;
	var procs;
	var features = "";

	var scr = "#!/bin/bash\n\n#Submit this script with: sbatch thefilename\n\n";
	var sbatch = function sbatch(txt) {
		scr += "#SBATCH " + txt + "\n";
	};

	sbatch("--time=" + this.inputs.runtimedays.value + "-" + this.inputs.runtimehours.value + ":" + this.inputs.runtimemins.value + ":" + this.inputs.runtimesecs.value + "   # max job runtime");

	var procs;
	sbatch("--cpus-per-task=" + this.values.num_cores + "   # number of processor cores");
	sbatch("--nodes=1   # number of nodes");


	if (this.values.is_gpu_job) {
		sbatch("--partition=gpu  # partition(s)");


		if(this.inputs.num_gpus.value > 0) {

		}


		if(this.values.acceptable_gpus.length > 0) {
			if (this.values.acceptable_gpus.length == this.inputs.acceptable_gpus.length) {
				sbatch("--gres=gpu:" + this.inputs.num_gpus.value);
			}
			else if (this.values.acceptable_gpus.length == 1) {
				var gputype = this.values.acceptable_gpus[0];
				sbatch("--gres=gpu:" + gputype + ":" + this.inputs.num_gpus.value);
			} else {
				sbatch("--gres=gpu:" + this.inputs.num_gpus.value);
				var excludelist = new Set();
				for (const unacceptable_gpu of this.values.unacceptable_gpus) {
					var gpu_settings = this.settings.acceptable_gpus_status[unacceptable_gpu];
					for (const slurm_node_name of gpu_settings.nodelist) {
						excludelist.add(slurm_node_name);
					}
				}
				sbatch("--exclude=" + Array.from(excludelist).join(',') + "  # there's no real way to specify multiple gpus types, so exclude the nodes that contain unacceptable gpus");

			}
		} else {
			sbatch("--gres=gpu:1");
		}
	} else {
		if(this.values.partitions.length > 0) {
			var partitions = this.values.partitions.join(",");
			sbatch("--partition=" + partitions + "   # partition(s)");
		}
	}


	sbatch("--mem=" + this.inputs.max_mem.value + this.inputs.mem_units.value.substr(0,1) + "   # max memory");

	if(this.inputs.job_name.value && this.inputs.job_name.value != "") {
		sbatch("-J \"" + this.inputs.job_name.value + "\"   # job name");
	}

	if(this.inputs.email_begin.checked || this.inputs.email_end.checked || this.inputs.email_abort.checked) {
		sbatch("--mail-user=" + this.values.email_address + "   # email address");
		if(this.inputs.email_address.value == this.settings.defaults.email_address)
			scr += "echo \"$USER: Please change the --mail-user option to your real email address before submitting. Then remove this line.\"; exit 1\n";
		if(this.inputs.email_begin.checked)
			sbatch("--mail-type=BEGIN");
		if(this.inputs.email_end.checked)
			sbatch("--mail-type=END");
		if(this.inputs.email_abort.checked)
			sbatch("--mail-type=FAIL");
	}

/* 	if(this.inputs.is_preemptable.checked)
		sbatch("--qos=" + this.settings.qos.preemptable);
	else if(this.inputs.is_test.checked)
		sbatch("--qos=" + this.settings.qos.test);
	if(this.inputs.is_requeueable.checked)
		sbatch("--requeue   #requeue when preempted and on node failure");
	if(this.inputs.need_licenses.checked) {
		var lics = new Array();
		var show_lics = 0;
		if(this.inputs.lic0_name.value != "" && this.inputs.lic0_count.value > 0) {
			lics.push(this.inputs.lic0_name.value + ":" + this.inputs.lic0_count.value);
			show_lics = 1;
		}
		if(this.inputs.lic1_name.value != "" && this.inputs.lic1_count.value > 0) {
			lics.push(this.inputs.lic1_name.value + ":" + this.inputs.lic1_count.value);
			show_lics = 1;
		}
		if(this.inputs.lic2_name.value != "" && this.inputs.lic2_count.value > 0) {
			lics.push(this.inputs.lic2_name.value + ":" + this.inputs.lic2_count.value);
			show_lics = 1;
		}
		if(show_lics)
			sbatch("--licenses=" + lics.join(",") + "   #format: lic1_name:lic1_count,lic2_name:lic2_count");
	}
	if(this.inputs.in_group.checked) {
		sbatch("--gid=" + this.inputs.group_name.value);
	}
 */

	scr += "\n\n# LOAD MODULES, INSERT CODE, AND RUN YOUR PROGRAMS HERE\n";
	return scr;
};

function stackTrace() {
    var err = new Error();
    return err.stack;
}

BYUScriptGen.prototype.updateJobscript = function() {
	this.retrieveValues();
	this.toJobScript();
	return;
};

BYUScriptGen.prototype.init = function() {

	this.form = this.createForm();
	this.containerDiv.appendChild(this.form);

	var scriptHeader = document.createElement("h2");
	scriptHeader.id = "byu_sg_script_header";
	scriptHeader.appendChild(document.createTextNode("Job Script"));
	this.containerDiv.appendChild(scriptHeader);

	this.jobNotesDiv = document.createElement("div");
	this.jobNotesDiv.id = "byu_sg_jobnotes";
	this.containerDiv.appendChild(this.jobNotesDiv);

	this.jobScriptDiv = document.createElement("div");
	this.jobScriptDiv.id = "byu_sg_jobscript";
	this.containerDiv.appendChild(this.jobScriptDiv);

	this.updateJobscript();
};

BYUScriptGen.prototype.toJobScript = function() {
	var scr = this.generateScriptSLURM();;
	this.jobScriptDiv.innerHTML = "<pre><code>" + scr + "</code></pre>";
};

