function toggleAccordion(header) {
  // Toggle 'active' class on header
  header.classList.toggle('active');

  // Get corresponding content
  const accordionContent = header.nextElementSibling;

  // Toggle 'open' class on content
  accordionContent.classList.toggle('open');
}

document.addEventListener("DOMContentLoaded", function () {
  // Bind event listeners to form submit events

  document.getElementById('customertype').addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent the default form submission
      CalculatedCustomerType('#customertype', 'cct1');
  });

  document.getElementById('industry').addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent the default form submission
      CalculatedCustomerType('#industry', 'cct2');
  });

  document.getElementById('jobfunction').addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent the default form submission
      CalculatedCustomerType('#jobfunction', 'cct3');
  });

  document.getElementById('jobLevel').addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent the default form submission
      CalculatedCustomerType('#jobLevel', 'cct4');
  });
});

function CalculatedCustomerType(formSelector, targetElementId) {
  var form = document.querySelector(formSelector);
  if (!form) {
      console.error("Form element not found with selector:", formSelector);
      return;
  }

  var elements = form.elements;
var txt = "";
for (var i = 0; i < elements.length; i++) {
  if (elements[i].checked) {
      txt += elements[i].value + ",";
  }
}

// Remove trailing comma and space
txt = txt.replace(/, $/, '');

var targetElement = document.getElementById(targetElementId);
if (!targetElement) {
  console.error("Target element not found with id:", targetElementId);
  return;
}

targetElement.textContent = txt;
}