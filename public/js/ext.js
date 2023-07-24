
var TPersona = (val) =>{

    console.log(val);
  
    if(val == '1' ){
      $('#divRuc').hide();
    }else if(val == '2'){
      $('#divRuc').show();
    }
  
}
  
var TipoDocumento = (val) => {
  
    console.log(val);
  
    if(val == '1'){
      $("#sMaterno").text("(*)");
      $('#n_documento').attr("maxlength", "8");
    }else if(val == '2'){
      $("#sMaterno").text("");
      $('#n_documento').val("");
      $('#n_documento').attr("maxlength", "10");
    }else if(val == '3'){
      $("#sMaterno").text("");
      $('#n_documento').attr("maxlength", "10");
    }
  
}
  
var isNumber = (evt) =>{
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

var btnEnviar = () =>{
    console.log("hola")
    if ($('#n_documento').val() == null  || $('#n_documento').val() == '' ) {
        $('#n_documento').addClass("hasError");
    }else {
        $('#n_documento').removeClass("hasError");
    }
    if ($('#r_social').val() == null || $('#r_social').val() == '') {
        $('#r_social').addClass("hasError");
    } else {
        $('#r_social').removeClass("hasError");
    }
    if ($('#ruc').val() == null || $('#ruc').val() == '') {
        $('#ruc').addClass("hasError");
    } else {
        $('#ruc').removeClass("hasError");
    }
    if ($('#t_documento').val() == "1") {
        if ($('#ap_materno').val() == null || $('#ap_materno').val() == '') {
            $('#ap_materno').addClass("hasError");
        } else {
            $('#ap_materno').removeClass("hasError");
        }
    }
    else {
        $('#ap_materno').removeClass("hasError");
    }
    if ($('#ap_paterno').val() == null || $('#ap_paterno').val() == '') {
        $('#ap_paterno').addClass("hasError");
    } else {
        $('#ap_paterno').removeClass("hasError");
    }
    if ($('#nombres').val() == null || $('#nombres').val() == '') {
        $('#nombres').addClass("hasError");
    } else {
        $('#nombres').removeClass("hasError");
    }
    if ($('#telefono').val() == null || $('#telefono').val() == '') {
        $('#telefono').addClass("hasError");
    } else {
        $('#telefono').removeClass("hasError");
    }
    if ($('#correo').val() == null || $('#correo').val() == '') {
        $('#correo').addClass("hasError");
    } else {
        $('#correo').removeClass("hasError");
    }
    if ($('#direccion').val() == null || $('#direccion').val() == '') {
        $('#direccion').addClass("hasError");
    } else {
        $('#direccion').removeClass("hasError");
    }
    if ($('#n_doc_envio').val() == null || $('#n_doc_envio').val() == '') {
        $('#n_doc_envio').addClass("hasError");
    } else {
        $('#n_doc_envio').removeClass("hasError");
    }
    if ($('#n_folio_envio').val() == null || $('#n_folio_envio').val() == '') {
        $('#n_folio_envio').addClass("hasError");
    } else {
        $('#n_folio_envio').removeClass("hasError");
    }
    if ($('#asunto_envio').val() == null || $('#asunto_envio').val() == '') {
        $('#asunto_envio').addClass("hasError");
    } else {
        $('#asunto_envio').removeClass("hasError");
    }

    var button = $(this);

    var formData = new FormData();
    // Read selected files
    var files =$('input[type=file]')[0].files;
    console.log(files.length);

    for(var i=0;i<files.length;i++){
        formData.append("filer_input[]", files[i], files[i]['filer_input']);
    }
    formData.append("t_persona", $("#t_persona").val());
    formData.append("ruc", $("#ruc").val());
    formData.append("r_social", $("#r_social").val());
    formData.append("t_documento", $("#t_documento").val());
    formData.append("n_documento", $("#n_documento").val());
    formData.append("ap_paterno", $("#ap_paterno").val());
    formData.append("ap_materno", $("#ap_materno").val());
    formData.append("nombres", $("#nombres").val());
    formData.append("telefono", $("#telefono").val());
    formData.append("correo", $("#correo").val());
    formData.append("direccion", $("#direccion").val());
    formData.append("t_doc_envio", $("#t_doc_envio").val());
    formData.append("n_doc_envio", $("#n_doc_envio").val());
    formData.append("n_folio_envio", $("#n_folio_envio").val());
    formData.append("asunto_envio", $("#asunto_envio").val());
    formData.append("_token", $("#_token").val());

    $.ajax({
        type: "POST",
        dataType: "json",
        cache: false,
        url: "{{ route('store') }}",
        data: formData,
        processData: false,
        contentType: false,
        success: function(data){
           
        },
        error: function(e){
            console.log("error");
        }
    });
}

