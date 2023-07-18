@foreach ($query as $i => $q)
    <tr class="<?php if($q->urgente === 1 ){  echo "urgente";  } ?>">
        <td><i class="<?php if($q->urgente === 1 ){  echo "icofont icofont-star text-danger ";  } ?>"></i></td>        
        <td>{{ $q->nombre }} <br /> {{ $q->exp }} - {{ $q->año_exp }}</td>
        <td>
            {{ $q->cabecera }} <br /> 
            @if(date("d/m/Y", strtotime($q->fecha)) === Carbon\Carbon::now()->format('d/m/Y'))
                Fecha: <strong>Hoy</strong>, a las {{ date("g:i A", strtotime($q->fecha)) }} 
            @else
                Fecha: {{ date("d/m/Y", strtotime($q->fecha)) }} {{ date("g:i A", strtotime($q->fecha)) }} 
            @endif
        </td>
        <td>
            <a href="{{ route('modulos.expinterno.view_emitidos', $q->id_folio) }}" class="bandejTool btn-cursor"  data-tippy-content="Ver Expediente" >
                {{ $q->firma }} <br /> {{ $q->asunto }} <br /> {{ $q->obs }} 
            </a>  
        </td>        
        <td>
            <button type="button" class="btn btn-nocolor bandejTool" data-toggle="modal" data-target="#large-Modal" onclick="btnModalArchivos('{{ $q->id_folio }}', 'folioint')" data-tippy-content="Ver Archivos adjuntos al expediente"><i class="fa fa-cloud-download"></i></button>
        </td>
        <td>
            <button type="button" class="btn btn-nocolor bandejTool" data-toggle="modal" data-target="#large-Modal" onclick="btnModalArchivosDerivado('{{ $q->id_folio }}', 'derivar')" data-tippy-content="Ver Archivos adjuntos al expediente cuando fue derivado"><i class="fa fa-cloud-download"></i></button>
        </td>
        <td class="inline">
            <button type="buttom" class="btn btn-sm nobtn" onclick="btnDerivado('{{ $q->derivar_id }}', '1', '{{ $q->id_folio }}')"><i class="fa fa-files-o"></i> Derivado Simple</button><br />
            <button type="buttom" class="btn btn-sm nobtn" onclick="btnDerivado('{{ $q->derivar_id }}', '2', '{{ $q->id_folio }}')"><i class="fa fa-files-o"></i> Derivado con Proveido</button><br />
            <button type="buttom" class="btn btn-sm nobtn" onclick="btnArchivado('{{ $q->derivar_id }}')"><i class="fa fa-floppy-o"></i> Archivado Simple</button><br />
            <button type="buttom" class="btn btn-sm nobtn" onclick="btnArchivado('{{ $q->derivar_id }}')"><i class="fa fa-floppy-o"></i> Archivado con Proveido</button>
        </td>
    </tr>
    
@endforeach
<script>
    tippy(".bandejTool", {
        allowHTML: true,
        followCursor: true,
    });
</script>