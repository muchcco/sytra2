@forelse ($log_archivo as $i => $log)
<tr>
    <td>{{ $i + 1 }}</td>
    <td>{{ date("d/m/Y", strtotime($log->fecha)) }}<br /> {{ date("g:i A", strtotime($log->fecha)) }} </td>
    <td>A: {{ $log->nom_lug }} | {{ $log->nom_ofi }} <br />Por: {{ $log->nombres }}</td>
    <td>{{ $log->obs }}</td>
    <td>
        @if ($log->forma === 0)
            Original
        @elseif($log->forma === 1)
            Copia
        @endif
        
    </td>
    <td>{{ $log->provei }}</td>
    <td>
        @if (isset($log->file))
            {{-- <a href="{{ asset($i->ubicacion.'\\'.$i->nombre_archivo) }}" target="_blank"> --}}
                <i class="fa fa-cloud-download"></i>
            {{-- </a> --}}
            SI
        @else
            NO
        @endif
    </td>
</tr>
@empty
<tr><td colspan="8" class="text-center text-danger">NO HAY DATOS DISPONIBLES...</td></tr>
@endforelse