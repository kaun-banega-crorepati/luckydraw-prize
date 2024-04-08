document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  document.getElementById('loader').style.display = 'block';
  document.getElementById('container').style.opacity = '0.5';
  
  const lotteryNumber = document.getElementById('lotteryNumber').value;
  const mobileNumber = document.getElementById('mobileNumber').value;
  
  fetch('https://sheetbase.co/api/host-navz/1HdDe--xf7QiIBDAEZFVMiwHo1PEVHoJf4o3-tyYAHM4/sheet1/')
    .then(response => response.json())
    .then(data => {
      const userDetails = data.data.find(user => user.lotteryNumber === lotteryNumber && user.mobileNumber === mobileNumber);
      //const userDetails = data.data.find(item => item.lotteryNumber === lotteryNumber && item.mobileNumber === mobileNumber);
      if (userDetails) {
       document.getElementById('loader').style.display = 'none';
       document.getElementById('container').style.opacity = '1';
       document.getElementById("loginMess").style.display = "inline-block";
       //details
       displayDetails(userDetails);
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("heading").innerText = "CONGRATULATIONS" + "\n" + userDetails.name;
        document.getElementById("heading").style.background = "#0070cb";
        document.getElementById("heading").style.color = "#fff";
        document.getElementById("heading").style.textDecoration = "none";
        document.getElementById("loginMess").innerText = "Login Successful";
        document.getElementById("loginMess").style.backgroundColor = "#00c04b";
        document.getElementById("loginMessage").style.display = "none";
      } else {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('container').style.opacity = '1';
        document.getElementById("loginMessage").style.display = "inline-block";
        alert('Details not found. Please check your details.');
        document.getElementById("loginMessage").innerText = "Invalid Details";
        document.getElementById("loginMessage").style.backgroundColor = "red";
      
      }
    })
    .catch(error => console.error('Error:', error));
});

function displayDetails(userDetails) {
  const detailsDiv = document.getElementById('details');
  detailsDiv.innerHTML = `
    <span style="font-size: 24px; font-weight: 600; background: #00c04b; color: #fff; padding: 2px 25px; border-radius: 5px;">DETAILS:-</span>
    <p>Name: ${userDetails.name}</p>
    <p>Mobile Number: ${userDetails.mobileNumber}</p>
    <p>Lottery Number: ${userDetails.lotteryNumber}</p>
    <p>Prize Name: Tata Nexon</p>
    <p>Prize Amount: RS. 8,50,000</p>
    <p>Registration Fees: RS. ${userDetails.registrationCharge}</p>
    <p>Prize Status: <span style="color: red;">Not Claimed</span></p>
    <img src="car.jpeg" style="width: 100%; border-radius: 5px; pointer-events: none;">
    <p style="font-size: 14px">*For Any Questions or Concerns, You Can Call Helpline No. +91 6909425653.</p>
    <a href = "tel:+916909425653" style = "padding: 5px 10px; background: #00c04b; text-decoration: none; color: #fff; border-radius: 5px;">CALL NOW</a>
  `;
}
