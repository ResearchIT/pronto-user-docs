from mkdocs.utils.meta import get_data
from os.path import exists
import re
import os

# this file is run by the mkdocs macros plugin

def parse_features(input):
    return [feature for feature in input.split(",")]

def parse_gres(input):
    gres = {}
    if input != "(null)":
        for match in re.finditer(r'gpu:(?P<card_type>[^:]+):(?P<quantity>\d+)\([S0-9_:,-]+\),?', input):
            if match.group('card_type') not in gres:
                gres[match.group('card_type')] = int(match.group('quantity'))
            else:
                gres[match.group('card_type')] += int(match.group('quantity'))
    return gres

def parse_sinfo_line(server_info, line):
    hostname, partition, sockets, cores_per_socket, threads_per_core, ram_in_mb, features, gres = line.strip().split("|")

    if hostname not in server_info:
        server_info[hostname] = {
            "partitions":[],
            "cores": int(sockets) * int(cores_per_socket) * int(threads_per_core),
            "memory": round(int(ram_in_mb) / 1024),
            "features": parse_features(features),
            "gpus": parse_gres(gres),
        }

    if partition != "whatever*":
        server_info[hostname]["partitions"].append(partition)

# keep this around in case we ever want to make individual hardware pages

# def main():

#     with open('data/sinfo.txt', 'r') as input_file:
#         for line in input_file:
#             parse_sinfo_line(server_info, line)

#     # update frontmatter on hardware pages

#     for hostname in server_info:
#         host_filename = "docs/hardware/" + hostname.split('.')[0] + ".md"
#         if exists(host_filename):
#             with open(host_filename, "r") as page:
#                 doc, metadata = get_data(page.read())
#                 metadata.update(server_info[hostname])
#         else:
#             doc = f"# {hostname}"
#             metadata = server_info[hostname]

#         doc = "---\n" + yaml.dump(metadata) + "\n---\n" + doc

#         with open(host_filename, "w") as page:
#             page.write(doc)


# main()

def define_env(env):

    "Hook function"

    # parsed from data/sinfo.txt
    # the output of sinfo --noheader -o '%n|%P|%X|%Y|%Z|%m|%f|%G'
    server_info = {}

    with open(os.path.dirname(os.path.realpath(__file__)) + '/data/sinfo.txt', 'r') as input_file:
        for line in input_file:
            parse_sinfo_line(server_info, line)


  # <thead><tr><th>GPU Type</th><th>RAM</th><th><a href="https://developer.nvidia.com/cuda-gpus">Compute Capability</a></th><th>Quantity</th></tr></thead>
    @env.macro
    def partition_hardware_table(partition):

        table = """
        <table class="docutils">
        """.strip()


        table += """
        <thead>
        <tr>
            <th>Server Name</th>
            <th>CPU Cores</th>
            <th>RAM</th>
            <th>Features</th>
        </tr>
        </thead>
        """.strip()

        for hostname in server_info:
            hinfo = server_info[hostname]

            if "AVX512" in hinfo["features"]:
                cpu_feature = "AVX512"
            elif "AVX2" in hinfo["features"]:
                cpu_feature = "AVX2"
            elif "AVX" in hinfo["features"]:
                cpu_feature = "AVX"
            else:
                cpu_feature = ""

            if partition in hinfo["partitions"]:
                table += f"""
                <tr>
                <td>{hostname}</td>
                <td>{hinfo["cores"]}</td>
                <td>{hinfo["memory"]} GB</td>
                <td>{cpu_feature}</td>
                </tr>
                """.strip()

        table += "</table>".strip()

        return table

  #
    @env.macro
    def gpu_partition_hardware_table():

        table = """
        <table class="docutils">
        """.strip()


        table += """
        <thead>
        <tr>
            <th>Server Name</th>
            <th>CPU Cores</th>
            <th>RAM</th>
            <th>GPUs</th>
            <th>Features</th>
        </tr>
        </thead>
        """.strip()

        for hostname in server_info:
            hinfo = server_info[hostname]
            gpus = "<br />".join([f"{gpu_type} x {gpu_quantity}" for gpu_type, gpu_quantity in hinfo["gpus"].items()])

            if "AVX512" in hinfo["features"]:
                cpu_feature = "AVX512"
            elif "AVX2" in hinfo["features"]:
                cpu_feature = "AVX2"
            elif "AVX" in hinfo["features"]:
                cpu_feature = "AVX"
            else:
                cpu_feature = ""

            gpu_features = ""
            if "NVLINK" in hinfo["features"]:
                gpu_features += "NVLINK"

            features = "<br />".join([cpu_feature, gpu_features])

            if 'gpu' in hinfo["partitions"]:
                table += f"""
                <tr>
                <td>{hostname}</td>
                <td>{hinfo["cores"]}</td>
                <td>{hinfo["memory"]} GB</td>
                <td>{gpus}</td>
                <td>{features}</td>
                </tr>
                """.strip()

        table += "</table>".strip()

        return table

    @env.macro
    def gpu_types_table():

        gpu_info = {
            'a40':{'ram':'48GB','cc':'sm_86'},
            'a100_1g.5gb':{'ram':'5GB','cc':'sm_80'},
            'a100_2g.10gb':{'ram':'10GB','cc':'sm_80'},
            'a100_3g.20gb':{'ram':'20GB','cc':'sm_80'},
            'a100-pcie':{'ram':'40GB','cc':'sm_80'},
            'a100-sxm4-80gb':{'ram':'80GB','cc':'sm_80'},
            'v100-pcie-16G':{'ram':'16GB','cc':'sm_70'},
            'v100-pcie-32G':{'ram':'32GB','cc':'sm_70'},
            'v100-sxm2-32G':{'ram':'32GB','cc':'sm_70'},
            'rtx_2080_Ti':{'ram':'11GB','cc':'sm_75'},
            'rtx_6000':{'ram':'24GB','cc':'sm_75'},
            'gtx_1080_ti':{'ram':'11GB','cc':'sm_61'},
        }

        table = """
        <table class="docutils">
        """.strip()


        table += """
        <thead>
        <tr>
            <th>GPU Type</th>
            <th>RAM</th>
            <th><a href="https://developer.nvidia.com/cuda-gpus">Compute Capability</a></th>
            <th>Quantity</th>
        </tr>
        </thead>
        """.strip()

        for gpu_type in gpu_info:
            gpu_info[gpu_type]["quantity"] = 0

        for hostname in server_info:
            hinfo = server_info[hostname]

            if "gpu" not in hinfo["partitions"]:
                continue

            for gpu_type, gpu_quantity in hinfo["gpus"].items():
                if gpu_type not in gpu_info:
                    gpu_info[gpu_type] = {
                        "ram":"?",
                        "cc":"?",
                        "quantity": 0,
                    }
                gpu_info[gpu_type]["quantity"] += gpu_quantity

        for gpu_type, gpu_stats in gpu_info.items():

            if gpu_stats["quantity"] == 0:
                continue

            table += f"""
            <tr>
            <td>{gpu_type}</td>
            <td>{gpu_stats["ram"]}</td>
            <td>{gpu_stats["cc"]}</td>
            <td>{gpu_stats["quantity"]}</td>
            </tr>
            """.strip()

        table += "</table>".strip()

        return table