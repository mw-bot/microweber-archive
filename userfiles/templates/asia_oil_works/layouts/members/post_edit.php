<form class="wymupdate">
  <div>
    <section>
      <label for="textarea"> Textarea* <small>This textarea is freely resizable</small> </label>
      <div>
        <textarea class="required" id="textarea" name="textarea"></textarea>
      </div>
    </section>
    <section>
      <label for="tags"> Tags <small>Comma separated</small> </label>
      <div>
        <input type="text" class="tags" name="tags" id="tags" value="awesome,tags" />
      </div>
    </section>
    <section>
      <label> Dropdown menu <small>You can add groups</small> </label>
      <div>
        <select>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
      </div>
    </section>
     
    <section>
      <label>Check boxes</label>
      <div>
        <div>
        <? category_tree(); ?>
        
        
        
          <input type="checkbox" name="checkbox" id="checkbox1" />
          <label for="checkbox1">Checkbox 1</label>
          <input type="checkbox" name="checkbox" id="checkbox2" />
          <label for="checkbox2">Checkbox 2</label>
          <input type="checkbox" name="checkbox" id="checkbox3" />
          <label for="checkbox3">Checkbox 3</label>
        </div>
        <div>
          <input type="checkbox" name="checkbox" id="checkbox4" />
          <label for="checkbox4">Checkbox 4</label>
          <input type="checkbox" name="checkbox" id="checkbox5" />
          <label for="checkbox5">Checkbox 5</label>
        </div>
        <div class="clear"></div>
      </div>
    </section>
  </div>
  <div class="clear"></div>
  <h2>Really awesome WYSIWYM-editor</h2>
  <textarea class="wysiwym"></textarea>
  <br />
  <p>
    <input type="submit" class="button primary submit" value="Submit" />
    <a href="#" class="button">Cancel</a> </p>
</form>
