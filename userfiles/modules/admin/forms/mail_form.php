<span class="mw_sidebar_module_box_title">Mailform settings</span>
<div class="mw_admin_rounded_box">
  <div class="mw_admin_box_padding">
    <table width="100%" border="0" cellspacing="4" cellpadding="0">
      <tr>
        <td colspan="2"><label>Form Title</label>
          <input name="form_title" class="mw_option_field" option_group="<? print $params['module_id'] ?>" type="text" refresh_modules="forms/mail_form"  value="<?php print option_get('form_title', $params['module_id']) ?>" />
          <!--           <input  value="<?php print option_get('form_title', $params['module_id']) ?>" />
                 --></td>
      </tr>
      <tr>
        <td colspan="2"><label>Form Description</label>
          <textarea name="form_description" cols=""  class="mw_option_field" refresh_modules="forms/mail_form"   option_group="<? print $params['module_id'] ?>" rows="2"><?php print option_get('media_description', $params['module_id']) ?></textarea></td>
      </tr>
      <tr>
        <td colspan="2"><label>Your email</label>
          <input name="form_email" class="mw_option_field" option_group="<? print $params['module_id'] ?>" type="text" refresh_modules="forms/mail_form"  value="<?php print option_get('media_name', $params['module_id']) ?>" /></td>
      </tr>
      
      
  
      
      
       <tr>
        <td colspan="2">
        <br />
<br />
<hr /></td>
      </tr>     
      
      <tr>
        <td><label>After submit</label></td>
        <td><select name="skin" class="mw_option_field" option_group="<? print $params['module_id'] ?>" type="text" refresh_modules="forms/mail_form" >
            <option value="'" <? if( trim(option_get('skin', $params['module_id'])) == '') : ?>  selected="selected" <? endif; ?> >Do nothing</option>
            <option value="1" <? if( option_get('skin', $params['module_id']) == '1') : ?>  selected="selected" <? endif; ?> >Go to page</option>
            <option value="2" <? if( option_get('skin', $params['module_id']) == '2') : ?>  selected="selected" <? endif; ?> >Send confirmation email</option>
             
          </select></td>
      </tr>
      
      
        <tr>
        <td colspan="2">
        <div>
        
        
        <label>Responce text</label>
          <textarea name="form_description" cols=""  class="mw_option_field" refresh_modules="forms/mail_form"   option_group="<? print $params['module_id'] ?>" rows="2"><?php print option_get('media_description', $params['module_id']) ?></textarea>
          </div>
          
          
          </td>
      </tr>     
      
      
    </table>
  </div>
</div>
