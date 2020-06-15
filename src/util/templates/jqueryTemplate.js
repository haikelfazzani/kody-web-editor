const jqueryTemplate = [
  `<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
<button>Toggle paragraphs</button>

<p>Welcome to Kody.</p>
<p>This is another paragraph.</p>`,
  'body { color: red; }',
  `$(document).ready(function(){
  $("button").click(function(){
    $("p").toggle();
  });
});`
];

export default jqueryTemplate;