@foreach ($query as $i => $q)
    <tr >
        <td> {{ $i }} </td>
        <td>{{ $q->nombre }} <br /> {{ $q->exp }} - {{ $q->año_exp }}</td>
        <td>
            {{ $q->cabecera }} <br /> 
            @if(date("d/m/Y", strtotime($q->fecha)) === Carbon\Carbon::now()->format('d/m/Y'))
                Fecha: <strong>Hoy</strong>, a las {{ date("g:i A", strtotime($q->fecha)) }} y {{ date("s", strtotime($q->fecha)) }}s.
            @else
                Fecha: {{ date("d/m/Y", strtotime($q->fecha)) }} {{ date("g:i A", strtotime($q->fecha)) }} 
            @endif
        </td>
        <td>
            <a href="{{ route('modulos.expinterno.view_emitidos', $q->id_folio) }}" class="bandejTool btn-cursor"  data-tippy-content="Ver Expediente" >
                {{ $q->firma }} <br /> {{ $q->asunto }} <br /> {{ $q->obs }} 
            </a>  
        </td>
        <td>{{ $q->onombre }} <br /> {{ $q->enombre }}  </td>        
        <td>
            <button type="button" class="btn btn-nocolor bandejTool" data-toggle="modal" data-target="#large-Modal" onclick="btnModalArchivos('{{ $q->id_folio }}')" data-tippy-content="Ver Archivos adjuntos al expediente"><i class="fa fa-cloud-download"></i></button>
        </td>
        <td class="inline">
            <a href="{{ route('modulos.expinterno.td_folios_edit', $q->id_folio) }}" class="btn btn-sm nobtn"><i class="fa fa-pencil-square-o"></i>  Editar</a><br />
            <a href="" class="btn btn-sm nobtn"><i class="fa fa-print"></i> Cargo</a>
        </td>
    </tr>
    
@endforeach
<script>
    tippy(".bandejTool", {
        allowHTML: true,
        followCursor: true,
    });
</script>