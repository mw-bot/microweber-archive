<script>

mw.require("forms.js", function(){});
</script>

<h1><?php print option_get('form_title', $params['id']) ?></h1>
<form class="mw_form">
  <? $save_as = option_get('form_save_as', $params['id']);

if($save_as == false){
$save_as = option_get('form_title', $params['id']);
}
 ?>
  <input  type="hidden" name="form_title" value="<? print $save_as; ?>" />
  <module type="custom_fields" id="<? print $params['id'] ?>"   />
</form>
