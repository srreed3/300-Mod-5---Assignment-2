function getTickets(employeeID) {
    $.ajax({
        url: 'https://jscript.rdm/ticketrequest.asp',
        type: 'GET',
        data: { employeeID: employeeID },
        dataType: 'xml',
        success: function(response) {
            //clear previous results
            $('#ticketTable tbody').empty();

            //parse XML response
            $(response).find('ticket').each(function() {
                const requestDate = $(this).find('requestDate').text();
                const empID = $(this).find('employeeID').text();
                const firstName = $(this).find('userFirstName').text();
                const lastName = $(this).find('userLastName').text();
                const problemDescription = $(this).find('problemDescription').text();
                const status = $(this).find('status').text();
                const responseProvided = $(this).find('responseProvided').text();

                //append row to table
                $('#ticketTable tbody').append(`
                    <tr>
                        <td>${requestDate}</td>
                        <td>${empID}</td>
                        <td>${firstName}</td>
                        <td>${lastName}</td>
                        <td>${problemDescription}</td>
                        <td>${status}</td>
                        <td>${responseProvided}</td>
                    </tr>
                `);
            });
        },
        error: function(error) {
            console.log('Error retrieving tickets:', error);
            $('#error').text('Error retrieving tickets. Please try again.').show();
        }
    });
}