// ===============================
// Business Logic
// ===============================
function Ticket(movieName, movieTime, moviePurchaser, isMatinee, isNewRelease) {
  this.movieName = movieName;
  this.movieTime = movieTime;
  this.moviePurchaser = moviePurchaser;
  this.isMatinee = isMatinee;
  this.isNewRelease = isNewRelease;
}
Ticket.prototype.getPrice = function() {
  return 2 + this.getMatineeDiscount() + this.getNewReleaseDiscount() + this.getPurchaserDiscount() ;
}
Ticket.prototype.getMatineeDiscount = function() {
  if (this.isMatinee) {
    return -0.5;
  }
  return 0;
}
Ticket.prototype.getNewReleaseDiscount = function() {
  if (this.isNewRelease) {
    return 1;
  }
  return 0;
}
Ticket.prototype.getPurchaserDiscount = function() {
  if (this.moviePurchaser === "student") {
    return -0.5;
  } else if (this.moviePurchaser === "senior") {
    return -1;
  }
  return 0;
}


function TicketPurchaser() {
  this.tickets = [];
}
TicketPurchaser.prototype.addTicket = function(ticket) {
  this.tickets.push(ticket);
}
TicketPurchaser.prototype.getTotalPrice = function() {
  var totalPrice = 0;
  this.tickets.forEach(function(ticket) {
    totalPrice += ticket.getPrice();
  });
  return totalPrice;
}


// ===============================
// User Interface Logic
// ===============================

$(document).ready(function() {
  // establish new TicketPurchaser
  var siteUser = new TicketPurchaser;

  // event handler for adding a ticket
  $('#ticketSubmit').submit(function(event) {
    event.preventDefault();

    var movieName = $('#movieSelection').val();
    var movieTime = $('#timeSelection').val();
    var isMatinee = false;
    var isNewRelease = false;
    if (movieTime === "1:00") {
      isMatinee = true;
    }
    for (var i=0; i<$('#regularTicketSelection').val(); i++) {
      var regularTickets = new Ticket(movieName, movieTime, "regular", isMatinee, isNewRelease);
      siteUser.addTicket(regularTickets);
    }
    for (var i=0; i<$('#studentTicketSelection').val(); i++) {
      var studentTickets = new Ticket(movieName, movieTime, "student", isMatinee, isNewRelease);
      siteUser.addTicket(studentTickets);
    }
    for (var i=0; i<$('#seniorTicketSelection').val(); i++) {
      var seniorTickets = new Ticket(movieName, movieTime, "senior", isMatinee, isNewRelease);
      siteUser.addTicket(seniorTickets);
    }
  });


});


// siteUser.addTicket("regular", 5)
