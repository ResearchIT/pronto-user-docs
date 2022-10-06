---
template: job_script_generator.html
---
# Job Script Generator

<div id="BYUJobScriptGenerator"></div>

<script type="text/javascript">
	/* The latest version of the Brigham Young University Script Generator is available at http://github.com/BYUHPC/BYUJobScriptGenerator */

	var byu_script_gen = new BYUScriptGen(document.getElementById("BYUJobScriptGenerator"));
	
	/* Dynamically generate this using PHP or whatever. You may also statically configure it */
	byu_script_gen.settings.acceptable_gpus = {
		names :{{ job_script_generator_acceptable_gpus_names() }},
	};
	byu_script_gen.settings.partitions = {
		names : [
			"interactive", "biocrunch", "speedy", "bigram", "legion", "swift"
		],
		info_base_url : "/guides/pronto/hardware/#",
	};
	/* End of stuff */

	byu_script_gen.settings.acceptable_gpus_status = {{ job_script_generator_acceptable_gpus_info() }};
	byu_script_gen.settings.partitions_status = {{ job_script_generator_partition_info() }};
	/* End of dynamically generated stuff */

	byu_script_gen.init();
</script>