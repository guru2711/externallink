import "./App.css";
import * as rangy from "rangy";
import { useEffect, useState } from "react";
import LinkModel from "./LinkModel";

function App() {
  const [url, seturl] = useState("");
  const [Range, setRange] = useState("");
  const [content, setcontent] = useState("");
  const [Linkmodel, setLinkmodel] = useState(false);
  const [position, setposition] = useState({ x: 50, y: 50 });
  const [LinkmodelEdit, setLinkmodelEdit] = useState(false);
  const [Editid, setEditid] = useState("");

  const [size, setSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight,
  });
  const updateSize = () =>
    setSize({
      x: window.innerWidth,
      y: window.innerHeight,
    });
  useEffect(() => (window.onresize = updateSize), []);

  const getFirstRange = () => {
    let sel = rangy.getSelection();
    return sel.rangeCount ? sel.getRangeAt(0) : null;
  };

  const close = () => {
    try {
      setLinkmodel(false);
      setRange("");
      setcontent("");
      seturl("");
      setLinkmodelEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  //Function to Open popup And Decide it position
  const popup = (event) => {
    try {
      event.preventDefault();
      if (event.which === 3) {
        let x = event.pageX;
        let y = event.pageY;

        setposition({ x, y });

        setLinkmodelEdit(true);
        let id = event.target.parentElement.id;
        if (id) {
          let element = document.getElementById(id);
          let a = element.querySelector("a");
          let content = element.querySelector(".content");
          let text = content.innerHTML;
          setcontent(text);
          let url = a.innerHTML;
          seturl(url);
          setEditid(id);
          setLinkmodel(true);
        } else {
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const putid = () => {
    try {
      let tooltip = document.querySelectorAll(".tooltip");
      let tooltiptext = document.querySelectorAll(".tooltiptext");
      let id = 1;
      if (tooltip.length > 0) {
        for (let Element of tooltip) {
          Element.id = "tooltip" + id;
          ++id;
        }
      }

      id = 1;
      if (tooltiptext.length > 0) {
        for (let Element of tooltiptext) {
          Element.id = "tooltiptext" + id;
          ++id;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const putLink = () => {
    try {
      setLinkmodel(false);
      let range = Range;

      if (range && !LinkmodelEdit) {
        let check = url.split(".");
        if (url !== "" && (check[0] === "www" || check[0] === "WWW")) {
          let newelement = document.createElement("div");
          newelement.className = "tooltip";
          newelement.contentEditable = false;
          range.deleteContents();
          let Content = document.createElement("span");
          Content.innerText = `${content}`;
          Content.className = "content";
          newelement.append(Content);
          newelement.addEventListener("contextmenu", function (e) {
            popup(e);
          });
          let toottiptext = document.createElement("span");
          toottiptext.className = "tooltiptext";
          let link = document.createElement("a");
          link.href = "https://" + url;
          link.innerHTML = url;
          link.target = "_blank";
          toottiptext.append(link);
          newelement.append(toottiptext);
          range.insertNode(newelement);
          rangy.getSelection().setSingleRange(range);
          putid();
          if (link.getBoundingClientRect().x > 600) {
            const change = document.querySelectorAll(".tooltiptext");
            for (let tool of change) {
              if (tool.getBoundingClientRect().x > 600) {
                tool.style.marginLeft = -120 + "px";
                console.log(tool.getBoundingClientRect().x);
              }
            }
          }
        } else if (url === "") {
        } else if (check[0] !== "www" || check[0] !== "WWW") {
        }
      } else if (LinkmodelEdit) {
        let check = url.split(".");
        if (url !== "" && (check[0] === "www" || check[0] === "WWW")) {
          setLinkmodelEdit(false);
          let Element = document.getElementById(Editid);
          let a = Element.querySelector("a");
          a.href = "https://" + url;
          a.innerHTML = url;
          let Content = Element.querySelector(".content");
          Content.innerHTML = content;
        } else if (url === "") {
        } else if (check[0] !== "www" || check[0] !== "WWW") {
        }
      } else {
      }
      close();
    } catch (error) {
      console.log(error);
      close();
    }
  };

  const handleLinkDelete = () => {
    try {
      setLinkmodel(false);
      let currentElement = document.getElementById(Editid);
      currentElement.parentNode.replaceChild(
        document.createTextNode(content),
        currentElement
      );
      close();
    } catch (error) {
      console.log(error);
      close();
    }
  };

  const handleLink = () => {
    try {
      let range = getFirstRange();
      if (range) {
        close();
        let word = rangy.getSelection().toString();
        setcontent(word);
        if (word) {
          let text = window.getSelection(),
            position = text.getRangeAt(0),
            boundary = position.getBoundingClientRect();
          setRange(range);
          if (boundary) {
            let x = boundary.x;
            let y = boundary.y;
            setposition({ x, y });
          }
          setLinkmodel(true);
        } else {
        }
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      {Linkmodel ? (
        <LinkModel
          PutLink={putLink}
          Close={close}
          Content={content}
          Setcontent={setcontent}
          Seturl={seturl}
          Url={url}
          Position={position}
          Edit={LinkmodelEdit}
          Delete={handleLinkDelete}
          width={size.x}
        />
      ) : (
        ""
      )}

      <button className="tooltipbtn button_Enable" onClick={handleLink}>
        Link
        {/* <span className="tooltiptextbtn">Alt+e</span> */}
      </button>
      <div
        id="over_all_div"
        onKeyDown={(e) => {
          if (e.altKey && (e.key === "e" || e.key === "E")) {
            e.preventDefault();
            handleLink();
          }
        }}
      >
        <hr></hr>
        <div className="section" id="sec1">
          <div
            className="para"
            id="par1"
            contentEditable={true}
            suppressContentEditableWarning={true}
          >
            Excepteur enim aliquip ea adipisicing excepteur cillum laborum in
            amet. Anim esse consequat ullamco ea magna enim consectetur
            cupidatat mollit mollit culpa eiusmod. Sunt duis adipisicing eiusmod
            sint commodo commodo.Excepteur mollit esse do et veniam culpa ipsum
            culpa enim. Elit ut nisi ex aute incididunt laboris consequat minim.
            Ea deserunt ea velit minim aute. Id aliquip sint sunt ut aliqua ut
            aute officia aliqua ullamco cupidatat deserunt.
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
