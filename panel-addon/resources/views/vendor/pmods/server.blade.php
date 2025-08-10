@extends('layouts.admin')
@section('title','PMods — Dashboard')
@section('content')
  <div id="pmods-root" data-server-uuid="{{ $server_uuid }}"></div>
  <script src="/vendor/pmods/index.js"></script>
@endsection
