
<h2>Tab 1</h2>

<module type="custom_fields" id="<? print $params['id'] ?>" view="admin" />



<h2>Tab 2 - settings</h2>
<fieldset>
  <legend>Field settings</legend>
  <div class="control-group">
    <label class="control-label">Form Title</label>
    <div class="controls">
      <input name="form_title" class="mw_option_field"   type="text" data-refresh="custom_fields"  value="<?php print option_get('form_title', $params['id']) ?>" />
      <p class="help-block">Supporting help text</p>
    </div>
  </div>
</fieldset>