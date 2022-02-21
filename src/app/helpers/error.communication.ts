import Swal from "sweetalert2";

export function errorCommunicationWithRetry(error: any) {
  Swal.fire({
    title: 'Ha ocurrido un problema',
    text: error.message,
    icon: 'error',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    backdrop: 'rgba(103, 58, 183, 0.3)',
    confirmButtonText: 'Reintentar'
  }).then((result: any) => {
    if (result.isConfirmed) {
      window.location.reload();
    }
  })
}
