function openOekaki(givenWidth, givenHeight)
{
    Tegaki.open({
        // when the user clicks on Finish
        onDone: function() {
          //var w = window.open('');
          
          teggy = true
          // Tegaki.flatten() returns a <canvas>
          Tegaki.flatten().toBlob(
            //postCommon.addSelectedFile(new File([blob], "ClipboardImage." + ext, { type: mime }));
            function(b) { postCommon.addSelectedFile(new File([b], "oekaki.png", { type: "image/png", replay: "greigjiorejgiorejgioerjgoierjoi" })) }
          );
        },
        // when the user clicks on Cancel
        onCancel: function() {console.log('Closing...')},
        
        // initial canvas size
        width: givenWidth,
        height: givenHeight
      });
}