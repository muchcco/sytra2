<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link href="{{ asset('https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css')}}" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="{{('css/app.css')}}">
    <!-- jquery file upload Frame work -->
    <link href="{{ asset('assets/pages/jquery.filer/css/jquery.filer.css')}}" type="text/css" rel="stylesheet">
    <link href="{{ asset('assets/pages/jquery.filer/css/themes/jquery.filer-dragdropbox-theme.css')}}" type="text/css" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('https://use.fontawesome.com/releases/v5.15.3/css/all.css')}}"  integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk" crossorigin="anonymous">

    {{-- preoad button --}}
    <link rel="stylesheet" href="{{ asset('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css')}}">

</head>
<body>
<article>
    <header>
        <div class="container ">
            <div class="row cab">
              <div class="col">
                <img src="{{ asset('img/200x75.png') }}" alt="">
              </div>
              <div class="col  title">
                <h2>MESA DE PARTES DIGITAL</h2>
              </div>
              <div class="col">
                <img src="{{ asset('img/200x75.png') }}" alt="">
              </div>
            </div>
          </div>
    </header>

    <section id="main">
      <div class="container">
        <div class="carp">
          <div class="card col-sm-8">
            <div class="card-header">
              <center><h2>ENVÍO DE DOCUMENTOS</h2></center>
            </div>
            <div class="card-body">
              <p >Para un registro correcto revisar la guia de usuario, click en Descargar Guia de Usuario</p>
            </div>
          </div>          
        </div>
      </div>
      <div class="container">
        <div class="carp">
          <div class="card col-sm-8">
            <div class="card-header">
              <h2>Datos del solicitante:</h2>
            </div>
            <form action="" enctype="multipart/form-data">
              <input type="hidden" name="_token" id="_token" value="{{ csrf_token() }}" />
            <div class="card-body">
              <div class="carp">
                <div class="form-p">
                  <div class="row col-sm-4 buut">
                    <div class="mb-3">
                      <label for="IdTipoPersona" class="control-label">Tipo de persona <span class="text-danger fw-bolder">(*)</span> </label>
                      <select name="t_persona" id="t_persona" class="form-select" aria-label="Tipo de Persona" onchange="TPersona(this.value);">
                        <option value="1" selected>CUIDADANO</option>
                        <option value="2">PERSONA JURIDICA</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="carp" id="divRuc">
                <div class="form-p">
                  <div class="row col-sm-4 buut">
                    <div class="mb-3">
                      <label for="NRuc" class="control-label">Nro de RUC <span class="text-danger fw-bolder">(*)</span></label>
                      <input type="text" class="form-control" name="ruc" id="ruc" onkeypress="return isNumber(event)">
                    </div>
                  </div>
                  <div class="row col-sm-8 buut">
                    <div class="mb-3">
                      <label for="RSocial" class="control-label">Razón Social <span class="text-danger fw-bolder">(*)</span></label>
                      <input type="text" class="form-control" name="r_social" id="r_social">
                    </div>
                  </div>
                </div>
              </div>
              <div class="carp">
                <div class="form-p">
                  <div class="row col-sm-4 buut">
                    <div class="mb-3">
                      <label for="TDoc" class="control-label">Tipo de Documento <span class="text-danger fw-bolder">(*)</span></label>
                      <select name="t_documento" id="t_documento" class="form-select" aria-label="Tipo de Persona" maxlength="8" onchange="TipoDocumento(this.value);">
                        <option value="1">DNI</option>
                        <option value="2">Carnet de Extranjería</option>
                        <option value="3">Pasaporte</option>
                      </select>
                    </div>
                  </div>
                  <div class="row col-sm-4 buut">
                    <div class="mb-3">
                      <label for="NDoc" class="control-label">Nro. Documento <span class="text-danger fw-bolder">(*)</span></label>
                      <input type="text" class="form-control" name="n_documento" id="n_documento" onkeypress="return isNumber(event)">
                    </div>
                  </div>
                </div>
              </div>
              <div class="carp">
                <div class="form-p">
                  <div class="row col-sm-4 buut">
                    <div class="mb-3">
                      <label for="TDoc" class="control-label">Apellido Paterno <span class="text-danger fw-bolder">(*)</span></label>
                      <input type="text" class="form-control" name="ap_paterno" id="ap_paterno">
                    </div>
                  </div>
                  <div class="row col-sm-4 buut">
                    <div class="mb-3">
                      <label for="RSocial" class="control-label">Apellido Materno <span id="sMaterno" class="text-danger fw-bolder">(*)</span></label>
                      <input type="text" class="form-control" name="ap_materno" id="ap_materno">
                    </div>
                  </div>
                  <div class="row col-sm-4 buut">
                    <div class="mb-3">
                      <label for="RSocial" class="control-label">Nombres <span class="text-danger fw-bolder">(*)</span></label>
                      <input type="text" class="form-control" name="nombres" id="nombres">
                    </div>
                  </div>
                </div>
              </div>
              <div class="carp">
                <div class="form-p">
                  <div class="row col-sm-4 buut">
                    <div class="mb-3">
                      <label for="IdTipoPersona" class="control-label">Teléfono <span class="text-danger fw-bolder">(*)</span></label>
                      <input type="text" class="form-control" name="telefono" id="telefono" onkeypress="return isNumber(event)">
                    </div>
                  </div>
                </div>
              </div>
              <div class="carp">
                <div class="form-p">
                  <div class="row col-sm-4 buut">
                    <div class="mb-3">
                      <label for="IdTipoPersona" class="control-label">Correo <span class="text-danger fw-bolder">(*)</span></label>
                      <input type="text" class="form-control" name="correo" id="correo">
                    </div>
                  </div>
                </div>
              </div>
              <div class="carp">
                <div class="form-p">
                  <div class="row col-sm-12 buut">
                    <div class="mb-3">
                      <label for="IdTipoPersona" class="control-label">Dirección <span class="text-danger fw-bolder">(*)</span></label>
                      <input type="text" class="form-control" name="direccion" id="direccion">
                    </div>
                  </div>
                </div>
              </div>

            </div>            
          </div>
        </div>
      </div>

      <div class="container">
        <div class="carp">
          <div class="card col-sm-8">
            <div class="card-header">
              <h2>Datos del documento:</h2>
            </div>
            <div class="card-body">
              <div class="carp">
                <div class="form-p">
                  <div class="row col-sm-4 buut">
                    <div class="mb-3">
                      <label for="TipoDoc" class="control-label">Tipo de documento <span class="text-danger fw-bolder">(*)</span></label>
                      <select name="t_doc_envio" id="t_doc_envio" class="form-select" aria-label="Tipo de Persona">
                        @foreach ($td_tipos as $t)
                          <option value="{{ $t->id }}">{{ $t->nombre }}</option>                            
                        @endforeach
                      </select>
                    </div>
                  </div>
                  <div class="row col-sm-4 buut">
                    <div class="mb-3">
                      <label for="NroDoc" class="control-label">Nro de documento <span class="text-danger fw-bolder">(*)</span></label>
                      <input type="text" class="form-control" name="n_doc_envio" id="n_doc_envio">
                    </div>
                  </div>
                </div>
              </div>
              <div class="carp">
                <div class="form-p">
                  <div class="row col-sm-4 buut">
                    <div class="mb-3">
                      <label for="TipoDoc" class="control-label">Nro. de folios <span class="text-danger fw-bolder">(*)</span></label>
                      <input type="text" class="form-control" name="n_folio_envio" id="n_folio_envio">
                    </div>
                  </div>
                </div>
              </div>
              <div class="carp">
                <div class="form-p">
                  <div class="row col-sm-12 buut">
                    <div class="mb-3">
                      <label for="TipoDoc" class="control-label">Asunto <span class="text-danger fw-bolder">(*)</span></label>
                      <textarea name="asunto_envio" id="asunto_envio" cols="30" rows="3" class="form-control" ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div class="carp">
                <div class="form-p">
                  <div class="row col-sm-6 buut">
                    <div class="mb-3">
                      <label for="TipoDoc" class="control-label">Documento(s) <span class="text-danger fw-bolder">(*)</span></label>
                      <div class="col-sm-10">
                        {{-- <div class="sub-title">Example 2</div> --}}
                        <input type="file" name="file[]" id="filer_input" multiple="multiple" class="col-sm-12">
                        {{-- <span class="messages text-danger" id="msm-file-error">Tiene que cargar un Archivo</span> --}}
                    </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="carp">
                <div class="form-p btn_enviar">
                  <div class="row col-sm-2 buut">
                    <div class="">
                      <button type="button" class="form-control btn btn-danger" id="btnEnviarForm" data-toggle="modal" data-target="#large-Modal"onclick="btnEnviar()">ENVIAR</button>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div class="carp">
                <div class="form-p">
                  <div class="row col-sm-3 buut">
                    <div class="mb-3">
                      <label for="TipoDoc" class="control-label">Nota </label>
                      
                    </div>
                  </div>
                  <div class="row col-sm-8 buut">
                    <div class="mb-3">
                      <ul>
                        <li>Para el documento principal el formato debe ser pdf, y tamaño máximo de 50MB</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

            </form>

            </div>
          </div>          
        </div>
      </div>
    </section>

</article>
<div id="error"></div>

@include('modal_err')

{{-- <script src="{{ asset('js/ext.js') }}"></script> --}}
<script src="{{ asset('js/jquery.min.js') }}"></script>
<script src="{{ asset('https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js')}}" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>


<!-- jquery file upload js -->
<script src="{{ asset('assets/pages/jquery.filer/js/jquery.filer.min.js')}}"></script>
<script src="{{ asset('assets/pages/filer/custom-filer.js')}}" type="text/javascript"></script>
<script src="{{ asset('assets/pages/filer/jquery.fileuploads.init.js')}}" type="text/javascript"></script>

{{-- <script src="{{ asset('js/bundle-boots.min.js')}}"></script>
<script src="{{ asset('js/bundle-boot.min.js')}}"></script>
<script src="{{ asset('js/pop.js')}}"></script> --}}

<script src="{{ asset('js/toastr.min.js')}}"></script>

<script>

$(document).ready(function() {
  TPersona();
  $('#divRuc').hide();
  TipoDocumento();
  // $('#n_documento').attr("maxlength", "8");
});

function MostrarMensaje(titulo, mensaje, tipo) {
    var $toast = toastr[tipo](mensaje, titulo);
}

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
    console.log("success")
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

    var tipo = "";
    var titulo = "Enviar documento";

    $.ajax({
        type: "POST",
        dataType: "json",
        cache: false,
        url: "{{ route('store') }}",
        data: formData,
        processData: false,
        contentType: false,
        beforeSend: function () {
            document.getElementById("btnEnviarForm").innerHTML = '<i class="fa fa-spinner fa-spin"></i> ESPERE';
            document.getElementById("btnEnviarForm").disabled = true;
        },
        success: function(result){
          if(result.success){

          }else{
            console.log(result);
          }
        },
        error: function(jqxhr,textStatus,errorThrown){
            console.log(jqxhr.responseJSON.error);
            console.log(textStatus);
            console.log(errorThrown);
            MostrarMensaje(titulo, jqxhr.responseJSON.error, "error");           
            
            document.getElementById("btnEnviarForm").innerHTML = 'ENVIAR';
            document.getElementById("btnEnviarForm").disabled = false;
            $("#errrroorr").modal('hide');
        }
    });
}





</script>


</body>
</html>