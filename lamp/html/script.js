console.log("Tes")

let x=0
fetch("http://192.168.234.128:3030/api/readKaryawan")
    .then(Response => Response.json())
    .then(json => {
        let body = ``
        console.log(body)
        let i =1;
        json.forEach(data => {
            console.log(data);
            body += `<tr>
            <td >${i}</td>
          <td >${data.kode_id}</td>
          <td >${data.nama}</td>
          <td >${data.no_tlp}</td>
          <td >${data.email}</td>
          <td >${data.tgl_lahir}</td>
          <td >${(data.alamat).substring(0, 20)}</td>
          <td >${data.status}</td>
          <td >${'Rp. '+data.gaji}</td>
          <td >
              <form action="" method="post" enctype="multipart/form-data">
                  <button class="btn btn-outline-primary btn-sm w-100" type=button onclick=updateAPI("${data.kode_id}")>Ubah </button>
                  <button class="btn btn-outline-danger btn-sm w-100" type=button onclick=deleteData("${data.kode_id}")>Hapus </button>
              </form>
          </td>
      </tr>`
i++;
        });
        document.getElementById("karyawanBody").innerHTML = body;
    })

async function cek(){
    if(x==1){
        goUpdateAPI()
        x=0
    }else{
        postAPI()
    }
    return x;
}

async function postAPI() {
    const obj = {
        kode_id: document.getElementById("kode_id").value,
        nama: document.getElementById("nama").value,
        no_tlp: document.getElementById("no_tlp").value,
        email: document.getElementById("email").value,
        tgl_lahir: document.getElementById("tgl_lahir").value,
        alamat: document.getElementById("alamat").value,
        status: document.querySelector('input[name="status"]:checked').value,
        gaji: document.getElementById("gaji").value,
    }
    console.log(obj)
    await fetch("http://192.168.234.128:3030/api/createKaryawan", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            console.log("cek"),
	    location.reload()
            alert(`Berhasil ${response.json()}`);
        })
        .catch(err => alert(`Tidak Berhasil ${err}`))
}

// async function getIdAPI(idValue) {
//     const judulForm = document.getElementById("judulNote" + idValue);
//     const textForm = document.getElementById("textNote" + idValue);
//     const obj = {
//         id: idValue
//     }
//     try {
//         const notes = await fetch("https://pokeapi.co/api/v2/pokemon/", {
//             method: "POST",
//             body: JSON.stringify(obj),
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             }
//         })


//         const res = await notes.json()
//         res.forEach(oldValue => {
//             judulForm.setAttribute("value", `${oldValue.judul}`)
//             textForm.innerHTML = oldValue.text
//         })
//     } catch (err) {
//         console.log(err)
//     }
// }

async function updateAPI(kode) {
    const obj = {kode: kode}
    console.log(obj)
    fetch("http://192.168.234.128:3030/api/readKaryawan/id", {
        method: "PUT",
        body: JSON.stringify(obj),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    },
    x=1
    )
    .then(Response => Response.json())
    .then(json => {
        let kode_id=""
        let nama=""
        let no_tlp=""
        let email=""
        let tgl_lahir=""
        let alamat=""
        let status=""
        let gaji=""
        json.forEach(data => {
            console.log(data);
            kode_id = data.kode_id
            nama = data.nama
            no_tlp = data.no_tlp
            email = data.email
            tgl_lahir = data.tgl_lahir
            alamat = data.alamat
            status = data.status
            gaji = data.gaji

        });
        document.getElementById("kode_id").value = kode_id;
        document.getElementById("kode_id").disabled = true;
        document.getElementById("nama").value = nama;
        document.getElementById("no_tlp").value = no_tlp;
        document.getElementById("email").value = email;
        document.getElementById("tgl_lahir").value = tgl_lahir;
        document.getElementById("alamat").value = alamat;
        document.getElementById("status").value = status;
        document.getElementById("gaji").value = gaji;
    })
}

function goUpdateAPI(){
    const obj = {
        kode_id: document.getElementById("kode_id").value,
        nama: document.getElementById("nama").value,
        no_tlp: document.getElementById("no_tlp").value,
        email: document.getElementById("email").value,
        tgl_lahir: document.getElementById("tgl_lahir").value,
        alamat: document.getElementById("alamat").value,
        status: document.querySelector('input[name="status"]:checked').value,
        gaji: document.getElementById("gaji").value,
    }
    console.log(obj)
    fetch("http://192.168.234.128:3030/api/updateKaryawan", {
        method: "PUT",
        body: JSON.stringify(obj),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            alert(`Berhasil ${response.json()}`);
            location.reload()
        })
        .catch(err => alert(`Tidak Berhasil ${err}`))
}

function deleteData(kode) {
    console.log(kode)
    const deleteConfirm = confirm("Apakah anda yakin ingin menghapusnya")
    if (deleteConfirm) {
        deleteAPI(kode)
    }

}
async function deleteAPI(kode) {
    console.log(kode)
    const obj = {
        kode: kode,
    }
    await fetch("http://192.168.234.128:3030/api/deleteKaryawan", {
        method: "DELETE",
        body: JSON.stringify(obj),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            alert(`Berhasil ${response.json()}`);
            location.reload()
        })
        .catch(err => alert(`Tidak Berhasil ${err}`))
}