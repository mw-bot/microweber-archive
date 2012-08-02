
<div class="control-group">
  <label class="control-label" for="custom_field_required<? print $rand ?>">Required</label>
  <div class="controls">
    <label class="checkbox">
      <input type="checkbox" id="custom_field_required<? print $rand ?>" value="y">
      Is this field Required? </label>
  </div>
</div>
<div class="control-group">
  <label class="control-label">Is active</label>
  <div class="controls">
    <label class="radio">
      <input type="radio" name="custom_field_is_active"   value="y" checked="">
      Yes </label>
    <label class="radio">
      <input type="radio" name="custom_field_is_active"   value="n">
      No </label>
  </div>
</div>
<div class="control-group">
  <label class="control-label" for="custom_field_help_text<? print $rand ?>">Help text</label>
  <div class="controls">
    <input type="text" class="input-xlarge" name="custom_field_help_text" id="custom_field_help_text<? print $rand ?>">
  </div>
</div>
<div class="form-actions">
  <button type="button" class="btn btn-primary" onclick="save_cf_<? print $rand ?>()">Save changes</button>
  <button class="btn">Cancel</button>
</div>
</fieldset>
</div>
