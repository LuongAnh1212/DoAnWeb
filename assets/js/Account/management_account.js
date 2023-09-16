// Kiểm tra tokenAD
let tokenAD = localStorage.getItem("tokenAD")? JSON.parse(localStorage.getItem("tokenAD")): [];
if (tokenAD != undefined && tokenAD.length != 0){
    console.log(tokenAD);
    let apiQuanTriVien = `http://127.0.0.1/Daily/api/QuanTriVien`;
    var content = ``;
    var content2 = ``;

    let dataQuanTriVien = fetch(apiQuanTriVien)
    .then((res) => res.json())
    .then((dataQuanTriVien) => {
        var stt = 0;
        var stt2 = 0; 
        dataQuanTriVien.forEach((data)=>{
            console.log(data);
            if (data.trang_thai != 0){
                stt++;
                content += `
                <tr>
                    <td class="align-middle text-center text-sm">${stt}</td>
                    <td>
                        <div class="d-flex px-2 py-1">
                            <div class="d-flex flex-column justify-content-center">
                                <h6 class="mb-0 text-sm">${data["ten"]}</h6>
                                <p class="text-xs text-secondary mb-0">${data["email"]}</p>
                            </div>
                        </div>
                    </td>
                    <td>`;
                if (data["trang_thai"] == 1){
                content +=` 
                        <p class="text-xs font-weight-bold mb-0">SupperAdmin</p>
                        `;
                }
                content +=`
                    </td>
                    <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold">${data["ngay_tham_gia"]}</span>
                    </td>
                    <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold">${data["cap_nhat_gan_nhat"]}</span>
                    </td>
                    <td class="text-center align-middle">
                        <a href="http://127.0.0.1/Daily/Admin/AccountProfile" class="text-secondary font-weight-bold text-xs" id="${data["QTV_ID"]}" data-toggle="tooltip" data-original-title="Datail">Detail</a>
                        |
                        <a href="javascript:;" class="text-secondary font-weight-bold text-xs edit_lsp" id="${data["QTV_ID"]}" data-toggle="tooltip" data-original-title="Edit">Edit</a>
                        | 
                        <a href="javascript:;" class="text-secondary font-weight-bold text-xs delete_lsp" id="${data["QTV_ID"]}" data-toggle="tooltip" data-original-title="Delete">Delete</a>
                    </td>
                </tr>
                `;
            }
            else{
                stt2++;
                content2 += `
                <tr>
                    <td class="align-middle text-center text-sm">${stt}</td>
                    <td>
                        <div class="d-flex px-2 py-1">
                            <div class="d-flex flex-column justify-content-center">
                                <h6 class="mb-0 text-sm">${data["ten"]}</h6>
                                <p class="text-xs text-secondary mb-0">${data["email"]}</p>
                            </div>
                        </div>
                    </td>
                    <td>
                        <p class="text-xs font-weight-bold mb-0">KHÔNG</p>
                    </td>
                    <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold">${data["ngay_tham_gia"]}</span>
                    </td>
                    <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold">${data["cap_nhat_gan_nhat"]}</span>
                    </td>
                    <td class="text-center align-middle">
                        <a href="http://127.0.0.1/Daily/Admin/AccountProfile" class="text-secondary font-weight-bold text-xs" id="${data["QTV_ID"]}" data-toggle="tooltip" data-original-title="Datail">Detail</a>
                        |
                        <a href="javascript:;" class="text-secondary font-weight-bold text-xs edit_lsp" id="${data["QTV_ID"]}" data-toggle="tooltip" data-original-title="Edit">Edit</a>
                        | 
                        <a href="javascript:;" class="text-secondary font-weight-bold text-xs delete_lsp" id="${data["QTV_ID"]}" data-toggle="tooltip" data-original-title="Delete">Delete</a>
                    </td>
                </tr>
                `;
            }
        });
        document.querySelector(".box-admin").innerHTML = content;
        document.querySelector(".box-admin-wait").innerHTML = content2;
    });
}
else{
    window.location.replace("http://127.0.0.1/Daily/Admin");
}