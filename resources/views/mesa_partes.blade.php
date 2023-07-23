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
            <div class="card-body">
              <div class="carp">
                <div class="form-p">
                  <div class="row col-sm-4 buut">
                    <div class="mb-3">
                      <label for="IdTipoPersona" class="control-label">Tipo de persona <span class="text-danger fw-bolder">(*)</span> </label>
                      <select name="t_persona" id="t_persona" class="form-select" aria-label="Tipo de Persona">
                        <option value="">CUIDADANO</option>
                        <option value="">PERSONA JURIDICA</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="carp">
                <div class="form-p">
                  <div class="row col-sm-4 buut">
                    <div class="mb-3">
                      <label for="NRuc" class="control-label">Nro de RUC <span class="text-danger fw-bolder">(*)</span></label>
                      <input type="text" class="form-control" name="ruc" id="ruc">
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
                      <select name="t_persona" id="t_persona" class="form-select" aria-label="Tipo de Persona">
                        <option value="">DNI</option>
                        <option value="">Carnet de Extranjería</option>
                        <option value="">Pasaporte</option>
                      </select>
                    </div>
                  </div>
                  <div class="row col-sm-4 buut">
                    <div class="mb-3">
                      <label for="NDoc" class="control-label">Nro. Documento <span class="text-danger fw-bolder">(*)</span></label>
                      <input type="text" class="form-control" name="r_social" id="r_social">
                    </div>
                  </div>
                </div>
              </div>
              <div class="carp">
                <div class="form-p">
                  <div class="row col-sm-4 buut">
                    <div class="mb-3">
                      <label for="TDoc" class="control-label">Apellido Paterno <span class="text-danger fw-bolder">(*)</span></label>
                      <input type="text" class="form-control">
                    </div>
                  </div>
                  <div class="row col-sm-4 buut">
                    <div class="mb-3">
                      <label for="RSocial" class="control-label">Apellido Materno <span class="text-danger fw-bolder">(*)</span></label>
                      <input type="text" class="form-control" name="r_social" id="r_social">
                    </div>
                  </div>
                  <div class="row col-sm-4 buut">
                    <div class="mb-3">
                      <label for="RSocial" class="control-label">Nombre <span class="text-danger fw-bolder">(*)</span></label>
                      <input type="text" class="form-control" name="r_social" id="r_social">
                    </div>
                  </div>
                </div>
              </div>
              <div class="carp">
                <div class="form-p">
                  <div class="row col-sm-4 buut">
                    <div class="mb-3">
                      <label for="IdTipoPersona" class="control-label">Teléfono <span class="text-danger fw-bolder">(*)</span></label>
                      <input type="text" class="form-control">
                    </div>
                  </div>
                </div>
              </div>
              <div class="carp">
                <div class="form-p">
                  <div class="row col-sm-4 buut">
                    <div class="mb-3">
                      <label for="IdTipoPersona" class="control-label">Correo <span class="text-danger fw-bolder">(*)</span></label>
                      <input type="text" class="form-control">
                    </div>
                  </div>
                </div>
              </div>
              <div class="carp">
                <div class="form-p">
                  <div class="row col-sm-12 buut">
                    <div class="mb-3">
                      <label for="IdTipoPersona" class="control-label">Dirección <span class="text-danger fw-bolder">(*)</span></label>
                      <input type="text" class="form-control">
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
                      <select name="t_persona" id="t_persona" class="form-select" aria-label="Tipo de Persona">
                        <option value="">DNI</option>
                        <option value="">Carnet de Extranjería</option>
                        <option value="">Pasaporte</option>
                      </select>
                    </div>
                  </div>
                  <div class="row col-sm-4 buut">
                    <div class="mb-3">
                      <label for="NroDoc" class="control-label">Nro de documento <span class="text-danger fw-bolder">(*)</span></label>
                      <input type="text" class="form-control" name="r_social" id="r_social">
                    </div>
                  </div>
                </div>
              </div>
              <div class="carp">
                <div class="form-p">
                  <div class="row col-sm-4 buut">
                    <div class="mb-3">
                      <label for="TipoDoc" class="control-label">Nro. de folios <span class="text-danger fw-bolder">(*)</span></label>
                      <input type="text" class="form-control" name="r_social" id="r_social">
                    </div>
                  </div>
                </div>
              </div>
              <div class="carp">
                <div class="form-p">
                  <div class="row col-sm-12 buut">
                    <div class="mb-3">
                      <label for="TipoDoc" class="control-label">Asunto <span class="text-danger fw-bolder">(*)</span></label>
                      <textarea name="" id="" cols="30" rows="3" class="form-control"></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div class="carp">
                <div class="form-p">
                  <div class="row col-sm-6 buut">
                    <div class="mb-3">
                      <label for="TipoDoc" class="control-label">Documento <span class="text-danger fw-bolder">(*)</span></label>
                      <div class="col-sm-10">
                        {{-- <div class="sub-title">Example 2</div> --}}
                        <input type="file" name="file[]" id="filer_input" multiple="multiple" class="col-sm-12">
                        <span class="messages"></span>
                    </div>
                    </div>
                  </div>
                </div>
              </div>

                

            </div>
          </div>          
        </div>
      </div>
    </section>

</article>

<script src="{{ asset('js/ext.js') }}"></script>
<script src="{{ asset('js/jquery.min.js') }}"></script>
<script src="{{ asset('https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js')}}" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>


<!-- jquery file upload js -->
<script src="{{ asset('assets/pages/jquery.filer/js/jquery.filer.min.js')}}"></script>
<script src="{{ asset('assets/pages/filer/custom-filer.js')}}" type="text/javascript"></script>
<script src="{{ asset('assets/pages/filer/jquery.fileuploads.init.js')}}" type="text/javascript"></script>
</body>
</html>