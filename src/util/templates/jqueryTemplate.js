const jqueryTemplate = [
  `<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
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