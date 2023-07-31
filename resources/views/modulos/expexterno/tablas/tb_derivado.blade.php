@foreach ($query as $i => $q)
    <tr class="">
        <td>{{ $q->cabecera }} <br /> {{ $q->exp }} - {{ $q->año_exp }}</td>
        <td>
            {{ $q->cabecera }} <br /> 
            @if(date("d/m/Y", strtotime($q->fecha)) === Carbon\Carbon::now()->format('d/m/Y'))
                Fecha: <strong>Hoy</strong>, a las {{ date("g:i A", strtotime($q->fecha)) }} 
            @else
                Fecha: {{ date("d/m/Y", strtotime($q->fecha)) }} {{ date("g:i A", strtotime($q->fecha)) }} 
            @endif
        </td>
        <td>
            <a href="{{ route('modulos.expexterno.ver_folio', $q->id_folio) }}" class="bandejTool btn-cursor"  data-tippy-content="Ver Expediente" >
                {{ $q->firma }} <br /> {{ $q->asunto }} <br /> {{ $q->obs }} 
            </a>  
        </td>       
        <td>
            {{ $q->nfolios }}
        </td> 
        <td>
            <button type="button" class="btn btn-nocolor bandejTool" data-toggle="modal" data-target="#large-Modal" onclick="btnModalArchivos('{{ $q->id_folio }}', 'folioint')" data-tippy-content="Ver Archivos adjuntos al expediente"><i class="fa fa-cloud-download"></i></button>
        </td>
        <td>
            <button type="button" class="btn btn-nocolor bandejTool" data-toggle="modal" data-target="#large-Modal" onclick="btnModalArchivosDerivado('{{ $q->id_folio }}', 'derivar')" data-tippy-content="Ver Archivos adjuntos al expediente cuando fue derivado"><i class="fa fa-cloud-download"></i></button>
        </td>
    </tr>
    
@endforeach
<script>
    tippy(".bandejTool", {
        allowHTML: true,
        followCursor: true,
    });
</script>