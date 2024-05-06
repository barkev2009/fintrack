import { useEffect, useId, useRef, useState } from "react";
import T from 'tesseract.js';
import DatePicker from "react-datepicker";
import axios from 'axios';

function App() {

  const [file, setFile] = useState('');
  const [src, setSrc] = useState(null);
  const [value, setValue] = useState('');
  const [scale, setScale] = useState(1);
  const [date, setDate] = useState(new Date());
  const id = useId();
  const log = useRef(null);
  const svg = useRef(null);
  const img = useRef(null);

  const upload = (e) => {
    setFile(e.target.files[0]);
    setValue(e.target.value);
    setSrc(URL.createObjectURL(e.target.files[0]));
    svg.current.innerHTML = '';
    log.current.innerHTML = '';
  }
  useEffect(
    () => {
      setTimeout(() => {
        if (img.current.height !== 0) {
          svg.current.style.width = `${img.current.width}px`;
          svg.current.style.height = `${img.current.height}px`;

          svg.current.style.transform = `scale(${window.screen.height / img.current.height})`;
          img.current.style.transform = `scale(${window.screen.height / img.current.height})`;
          setScale(window.screen.height / img.current.height);
        }
      }, 10);
    }, [src]
  );

  const buttonHandler = async () => {
    T.recognize(file, 'rus+eng', {
      logger: data => {
        log.current.innerHTML = '';
        const statusText = document.createTextNode(data.status);
        const progress = document.createElement('progress');
        progress.max = 1;
        progress.value = data.progress;
        log.current.appendChild(statusText);
        log.current.appendChild(progress);
      },
    })
      .then(({ data }) => {
        console.log(data);
        let text = data.text;
        // log.current.innerHTML = '';
        log.current.innerHTML = data.hocr;
        document.querySelectorAll('.ocr_line').forEach(item => item.outerHTML = item.outerHTML.replace('<span', '<div'));
        document.querySelectorAll('.ocr_line').forEach(item => item.style.textWrap = 'nowrap');
        document.querySelectorAll('.ocrx_word').forEach(item => item.setAttribute('title', item.getAttribute('title').replace(/bbox.*conf/g, 'confidence:')));
        document.querySelectorAll('.ocrx_word').forEach(
          item => item.addEventListener(
            'mouseenter',
            (e) => {
              const id = e.target.id.replace('word', 'rect');
              document.getElementById(id).style.fill = 'blue';
            }
          )
        );
        document.querySelectorAll('.ocrx_word').forEach(
          item => item.addEventListener(
            'mouseleave',
            (e) => {
              const id = e.target.id.replace('word', 'rect');
              document.getElementById(id).style.fill = 'none';
            }
          )
        );
        text = text.replace(/\n\s*\n/g, '\n');
        const pre = document.createElement('pre');
        // pre.innerHTML = text;
        log.current.appendChild(pre);
        drawBoxes(data);
        console.log(process.env.REACT_APP_SERVER + 'api/receipt');
        axios.post(process.env.REACT_APP_SERVER + 'api/receipt', {
          createDate: date,
          payload: {
            text: data.text,
            words: data.words.map(({bbox, language, choices, confidence, text}) => ({bbox, language, choices, confidence, text})),
            hocr: data.hocr
          }
        }).then(
          resp => {
            console.warn('REQUEST SUCCESSFUL');
            console.log(resp.data);
          }
        ).catch(err => console.error(err))
      })
  }

  const drawBoxes = (data) => {
    const mainBox = data.blocks[0].bbox;
    // svg.current.style.left = `${mainBox.x0}px`;
    svg.current.style.transformOrigin = 'left top';
    // svg.current.style.transform = `scale(${scale})`;
    // svg.current.style.width = `${img.current.width}px`;
    // svg.current.style.height = `${img.current.height}px`;
    let word;
    for (let i = 0; i < data.words.length; i++) {
      word = data.words[i];
      const bbox = word.bbox;
      const rect = document.createElement('rect');
      rect.setAttribute('stroke', getColor(word.confidence));
      rect.setAttribute('id', `rect_1_${i + 1}`);
      rect.setAttribute('stroke-width', '2');
      rect.setAttribute('fill-opacity', '0.3');
      rect.setAttribute('fill', 'none');
      rect.setAttribute('x', bbox.x0);
      rect.setAttribute('y', bbox.y0);
      rect.setAttribute('width', Number(bbox.x1) - Number(bbox.x0));
      rect.setAttribute('height', Number(bbox.y1) - Number(bbox.y0));
      svg.current.appendChild(rect);
    }
    svg.current.innerHTML += '';
  }

  function getColor(value) {
    //value from 0 to 1
    var hue = (value / 100 * 120).toString(10);
    return ["hsl(", hue, ",100%,50%)"].join("");
  }

  return (
    <div>
      <label htmlFor={id}>
        <input type="file" value={value} onChange={upload} id={id} />
      </label>
      <button onClick={buttonHandler}>OCR</button>
      <DatePicker selected={date} onChange={(e) => setDate(e)} />
      <div style={{ display: 'flex' }}>
        <div ref={log} id="progress"></div>
        <div style={{ position: 'relative' }} className="container">
          <img ref={img} src={src} style={{ transformOrigin: 'left top' }} />
          <svg ref={svg} className="bboxes" style={{ position: 'absolute', transformOrigin: 'left top', left: 0 }} ></svg>
        </div>
      </div>
    </div>
  );
}

export default App;
