import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

function LinkModel({
  PutLink,
  Close,
  Content,
  Setcontent,
  Seturl,
  Url,
  Position,
  Edit,
  Delete,
  width,
}) {
  const [Enable, setEnable] = useState(false);
  useEffect(() => {
    function dragElement(elmnt) {
      var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
      if (document.getElementById(elmnt.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "header").onmousedown =
          dragMouseDown;
      } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
      }

      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
      }

      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = elmnt.offsetTop - pos2 + "px";
        elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
      }

      function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }
    console.log(Edit);
    if (Edit) {
      setEnable(true);
      //Make the DIV element draggagle:
      dragElement(document.getElementById("mydiv"));
    } else {
      setEnable(false);
      dragElement(document.getElementById("mydiv"));
    }
  }, [Edit]);

  const submit = () => {
    try {
      PutLink();
    } catch (error) {
      console.log(error);
    }
  };
  let Currentposition = {
    position: "absolute",
    left: (Position.x + 250 > width ? Position.x - 200 : Position.x) + "px",
    top: Position.y + 25 + "px",
  };
  return (
    <div className="Linkmodel" id="mydiv" style={Currentposition}>
      <div id="mydivheader">
        <div className="Link_title-gird">
          <div className="Link_title">External Link</div>
          <div className="Link_title_close" onClick={Close}>
            X
          </div>
        </div>
      </div>
      <hr></hr>
      <div>
        <input
          type="text"
          id="word"
          value={Content}
          onChange={(e) => {
            Setcontent(e.target.value);
          }}
          placeholder="word"
        />
        <br />
        <br />

        <input
          type="text"
          id="link"
          value={Url}
          onChange={(e) => {
            Seturl(e.target.value);
            if (e.target.value.length > 3) {
              if (e.target.value === "www." || e.target.value === "WWW.") {
                setEnable(true);
              }
            } else {
              setEnable(false);
            }
          }}
          placeholder="Link"
        />
        <div className="positionend">
          {Edit ? (
            <button
              className={Enable ? "save" : "button_dissable"}
              onClick={submit}
              disabled={!Enable}
            >
              Save
            </button>
          ) : (
            <button
              className={Enable ? "button_enable" : "button_dissable"}
              onClick={submit}
              disabled={!Enable}
            >
              Apply
            </button>
          )}

          {Edit ? (
            // <button className="delete" onClick={Delete}>
            <RiDeleteBin6Line size={25} className="delete" onClick={Delete} />
          ) : (
            // </button>
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default LinkModel;
