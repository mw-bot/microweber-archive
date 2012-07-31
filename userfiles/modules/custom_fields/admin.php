  <fieldset>
            <legend>Field settings</legend>
            <div class="control-group">
              <label class="control-label">Form Title</label>
              <div class="controls">
                <input name="form_title" class="mw_option_field input-xlarge" option_group="<? print $params['id'] ?>" type="text" refresh_modules="custom_fields/"  value="<?php print option_get('form_title', $params['id']) ?>" />
                <p class="help-block">Supporting help text</p>
              </div>
            </div>
          </fieldset>