<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <link href="{{ asset('https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css')}}" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="{{('css/app.css')}}">
</head>
<body>

<header>
    <center style="color:#fff;"><h1>CARGO DE EXPEDENTE</h1></center>
</header>
<br />
<main>
    <section>
        <div class="row">
            <center ><h2>EXPEDIENTE N° {{ $data->exp }}-{{ $data->año_exp }}</h2></center>
        </div>        
    </section>

    <section>
        <div class="card">
            <div class="card-header">
                <h4>Encabezado:</h4>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-12">
                        Datos del remitente: {{ $data->nombres }}, {{ $data->ap_paterno }} {{ $data->ap_materno }}
                     </div>
                     <div class="col-12">
                        Documento: {{ $data->cabecera }}
                     </div>
                     <div class="col-12">
                        Destino: Mesa de Partes.
                     </div>
                     <div class="col-12">
                        Nro. de folios: {{ $data->nfolios }}
                     </div>
                     <div class="col-12">
                        Asunto: {{ $data->asunto }}
                     </div>
                     <div class="col-12">
                        Fecha: {{ $data->fecha }}
                     </div>
                     <div class="col-12">

                     </div>
                </div>
            </div>
        </div>
        <br />
        <br />
        <div class="card">
            <div class="card-header">
                <h4>Detalle:</h4>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-12">
                        Ingrese al siguiente Link o escanee el siguiente codigo QR: 
                     </div>
                     <div class="col-12">
                        <a href="https://sistramite.ankara-ti.com/public/mesa_partes.php">Clic Aqui</a>
                     </div>
                     <br />
                     <div class="col-12">
                        <img src="data:image/svg+xml;base64,{{ base64_encode($codigoQR) }}">
                     </div>
                     <br />
                     <div class="col-12">
                        <strong>Observación:</strong> Se envió el detalle a su correo {{ $data->correo }}
                     </div>
                     <div class="col-12">
                        <center>Nota: La recepción NO da conformidad al contenido.</center>
                     </div>
                </div>
            </div>
        </div>
    </section>
</main>

<footer>
    <div class="row">
        <center>Desarrollado por la oficina de OGTI</center>
    </div> 
</footer>




<script src="{{ asset('js/jquery.min.js') }}"></script>
<script src="{{ asset('https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js')}}" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    
</body>
</html>