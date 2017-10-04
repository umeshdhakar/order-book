//$(function(){
//    var $status_filter = '', $date_filter= '' ;
//    $('.btn-filter').click(function(){
//        $status_filter = $(this).data('target');
//        if($status_filter != 'all') {
//            $('.table-filter tr').css('display', 'none');
//            $('.table-filter tr[data-status="'+$status_filter+'"], .table-filter tr[data-date="22/07/2017"]').fadeIn('slow');
//        }
//        else {
//            $('.table-filter tr').css('display', 'none').fadeIn('slow');
//        }
//    });
//    $('#date-filter').change(function(){
//        var $date_filter = $(this).val();
//        $date = $date_filter.split('-');
//        $date_filter = $date[2]+'/'+$date[1]+'/'+$date[0]; 
//        $('.table-filter tr').css('display', 'none');
//        $('.table-filter tr[data-date="'+$date_filter+'"]').fadeIn('slow');
//    });
//});

//var $status_filter = '',
//                $date_filter = '';
//            setTodayDate();
//            $('.btn-filter').click(function () {
//                $status_filter = $(this).data('target');
//                if ($status_filter != 'all') {
//                    filter_orders();
//                } else {
//                    $('.table-filter tr').css('display', 'none').fadeIn('slow');
//                }
//            });
//            $('#date-filter').change(function () {
//                $date_filter = $(this).val();
//                $date = $date_filter.split('-');
//                $date_filter = $date[2] + '/' + $date[1] + '/' + $date[0];
//                filter_orders();
//            });
//
//            function filter_orders() {
//                $('.table-filter tbody tr').css('display', 'none');
//                $('.table-filter tbody tr[data-status="' + $status_filter + '"][data-date="' + $date_filter + '"]').fadeIn('slow');
//                $('.filter-type').text("Status: " + $status_filter + ", Date: " + $date_filter);
//            }

$(function () {
            function setTodayDate() {
                var d = new Date();
                var date = d.getDate();
                var mon = d.getMonth();
                var year = d.getFullYear();
                date = (date < 10) ? '0' + date : date;
                mon = (mon < 10) ? '0' + mon : mon;
                $('#order_date').val(year + '-' + mon + '-' + date);
            }
            setTodayDate();
            $(document).on('click', '.addNewCustomer',function () {
                    $('.customer-panel').empty();
                    $('.customer-panel').load('../../views/customer.html');
                }); 
            $('.customer-panel').load('../../views/open.html');
            $(document).on('click', '#back', function () {
                    $('.customer-panel').empty();
                    $('.customer-panel').load('../../views/open.html');
                });
            });