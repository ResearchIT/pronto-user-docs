# Old Containers and Their Software Versions

## Software Versions
The column on the left is the name of the module to load to get these versions of the software.

<div class="wy-table-responsive">
    <table class="docutils">
        <thead>
            <tr>
                <td></td>
                <th>Python</th>
                <th>R</th>
                <th>PyTorch</th>
                <th>TensorFlow</th>
                <th>Keras</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row">
                   ml-gpu/20220603
                </th>
                <td>3.9.13</td>
                <td>4.1.3</td>
                <td>1.11.0a0+gitbc2c6ed</td>
                <td>2.9.1</td>
                <td>2.9.0</td>
            </tr>
            <tr>
                <th scope="row">
                   ml-gpu/20210901
                </th>
                <td>3.8.11</td>
                <td>4.1.0</td>
                <td>1.9.0a0+gitd69c22d</td>
                <td>2.5.0</td>
                <td>(broken)</td>
            </tr>
            <tr>
                <th scope="row">
                   ml-gpu/20210730
                </th>
                <td>3.6.8</td>
                <td>4.0.5</td>
                <td>1.10.0a0+gitdc1bd6a</td>
                <td>2.5.0</td>
                <td>(broken)</td>
            </tr>
            <tr>
                <th scope="row">
                   ml-gpu/20210616
                </th>
                <td>3.6.8</td>
                <td>4.0.5</td>
                <td>1.9.0+cu111</td>
                <td>2.5.0</td>
                <td>(broken)</td>
            </tr>
            <tr>
                <th scope="row">
                   ml-gpu/20210428
                </th>
                <td>3.6.8</td>
                <td>4.0.4</td>
                <td>1.8.0+cu111</td>
                <td>2.4.1</td>
                <td>2.4.3</td>
            </tr>
            <tr>
                <th scope="row">
                   ml-gpu/20210319
                </th>
                <td>3.6.8</td>
                <td>4.0.4</td>
                <td>1.8.0+cu111</td>
                <td>2.4.1</td>
                <td>2.4.3</td>
            </tr>
            <tr>
                <th scope="row">
                   ml-gpu/20210222
                </th>
                <td>3.6.8</td>
                <td>4.0.3</td>
                <td>1.7.1</td>
                <td>2.4.1</td>
                <td>2.4.3</td>
            </tr>
            <tr>
                <th scope="row">
                   ml-gpu/20210202
                </th>
                <td>3.6.8</td>
                <td>4.0.3</td>
                <td>1.7.1</td>
                <td>2.4.1</td>
                <td>2.4.3</td>
            </tr>
            <tr>
                <th scope="row">
                   ml-gpu/20200915
                </th>
                <td>3.6.8</td>
                <td>4.0.2</td>
                <td>1.6.0</td>
                <td>2.3.0</td>
                <td>2.4.3</td>
            </tr>
            <tr>
                <th scope="row">
                   ml-gpu/20200902
                </th>
                <td>3.6.8</td>
                <td>4.0.2</td>
                <td>1.6.0</td>
                <td>2.3.0</td>
                <td>2.4.3</td>
            </tr>
            <tr>
                <th scope="row">
                   ml-gpu/20200210
                </th>
                <td>2.7.5, 3.6.8</td>
                <td>3.6.0</td>
                <td>1.4.0</td>
                <td>2.1.0</td>
                <td>2.3.1</td>
            </tr>
            <tr>
                <th scope="row">
                   ml-gpu/20190715
                </th>
                <td>2.7.5, 3.6.8</td>
                <td>3.6.0</td>
                <td>1.1.0</td>
                <td>1.14.0</td>
                <td>2.2.4</td>
            </tr>
            <tr>
                <th scope="row">
                   ml-gpu/20190305
                </th>
                <td>2.7.5</td>
                <td>3.5.2</td>
                <td>1.0.1.post2</td>
                <td>1.13.1</td>
                <td>2.2.4</td>
            </tr>
        </tbody>
    </table>
</div>

## Compatibility

Please note that in older versions of the container you may need to adjust the commands from those given in the previous guides.

The virtual environment functionality might not work. You can achieve similar results by running the following before loading the ml-gpu module:

```
export PYTHONUSERBASE=/work/LAS/your-lab/mlgpupackages
```

Then, instead of `ml-gpu /work/LAS/your-lab/mlgpuvenv/bin/pip3`, try one of:

* `ml-gpu python -m pip`
* `ml-gpu pip2`
* `ml-gpu pip3`


And, instead of `ml-gpu /work/LAS/your-lab/mlgpuvenv/bin/python`, try one of:

* `ml-gpu python`
* `ml-gpu python2`
* `ml-gpu python3`