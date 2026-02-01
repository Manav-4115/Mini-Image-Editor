let filter = {
  Brightness: { value: 100, min: 0, max: 200, unit: '%' },
  Contrast: { value: 100, min: 0, max: 200, unit: '%' },
  Saturation: { value: 100, min: 0, max: 200, unit: '%' },
  HueRotate: { value: 0, min: 0, max: 360, unit: 'deg' },
  Blur: { value: 0, min: 0, max: 20, unit: 'px' },
  Grayscale: { value: 0, min: 0, max: 100, unit: '%' },
  Sepia: { value: 0, min: 0, max: 100, unit: '%' },
  Opacity: { value: 100, min: 0, max: 200, unit: '%' },
  Invert: { value: 0, min: 0, max: 100, unit: '%' },
};

const downloadbtn = document.getElementById('Downloadbtn');
const restbtn = document.getElementById('Resetbtn');
const imageCanvas = document.getElementById('imageCanvas');
const imgInput = document.getElementById('imageInput');
const Canvasctx = imageCanvas.getContext('2d');
const filtersContainer = document.querySelector('.filters');
const presetsContainer = document.querySelector('.presets');

let file = null;
let img = null;

function createFilter(name, value, unit, max, min) {
  const div = document.createElement('div');
  div.classList.add('Filters');

  const p = document.createElement('p');
  p.innerText = name;

  const input = document.createElement('input');
  input.type = 'range';
  input.min = min;
  input.max = max;
  input.value = value;
  input.id = name;

  input.addEventListener('input', () => {
    filter[name].value = input.value;
    applyFilters();
  });

  div.appendChild(p);
  div.appendChild(input);

  return div;
}

function createfilters() {
  filtersContainer.innerHTML = '';
  Object.keys(filter).forEach(key => {
    filtersContainer.appendChild(
      createFilter(key, filter[key].value, filter[key].unit, filter[key].max, filter[key].min)
    );
  });
}

imgInput.addEventListener('change', (e) => {
  if (!e.target.files || !e.target.files[0]) return;

  file = e.target.files[0];

  const placeholder = document.querySelector('.placeholder');
  imageCanvas.style.display = 'block';
  placeholder.style.display = 'none';

  const image = new Image();
  const url = URL.createObjectURL(file);
  image.src = url;

  image.onload = () => {
    img = image;
    imageCanvas.width = image.width;
    imageCanvas.height = image.height;
    Canvasctx.drawImage(image, 0, 0);
  };
});

function applyFilters() {
  if (!img) return;

  Canvasctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

  Canvasctx.filter =
    `brightness(${filter.Brightness.value}${filter.Brightness.unit}) ` +
    `contrast(${filter.Contrast.value}${filter.Contrast.unit}) ` +
    `saturate(${filter.Saturation.value}${filter.Saturation.unit}) ` +
    `hue-rotate(${filter.HueRotate.value}${filter.HueRotate.unit}) ` +
    `blur(${filter.Blur.value}${filter.Blur.unit}) ` +
    `grayscale(${filter.Grayscale.value}${filter.Grayscale.unit}) ` +
    `sepia(${filter.Sepia.value}${filter.Sepia.unit}) ` +
    `opacity(${filter.Opacity.value}${filter.Opacity.unit}) ` +
    `invert(${filter.Invert.value}${filter.Invert.unit})`;

  Canvasctx.drawImage(img, 0, 0);
}

restbtn.addEventListener('click', () => {
  filter = {
    Brightness: { value: 100, min: 0, max: 200, unit: '%' },
    Contrast: { value: 100, min: 0, max: 200, unit: '%' },
    Saturation: { value: 100, min: 0, max: 200, unit: '%' },
    HueRotate: { value: 0, min: 0, max: 360, unit: 'deg' },
    Blur: { value: 0, min: 0, max: 20, unit: 'px' },
    Grayscale: { value: 0, min: 0, max: 100, unit: '%' },
    Sepia: { value: 0, min: 0, max: 100, unit: '%' },
    Opacity: { value: 100, min: 0, max: 100, unit: '%' },
    Invert: { value: 0, min: 0, max: 100, unit: '%' },
  };

  createfilters();
  applyFilters();
});

downloadbtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'edited-image.png';
  link.href = imageCanvas.toDataURL();
  link.click();
});

createfilters();

const presets = {
  Drama: {
    Brightness: 90,
    Contrast: 140,
    Saturation: 130,
    HueRotate: 0,
    Blur: 0,
    Grayscale: 0,
    Sepia: 10,
    Opacity: 100,
    Invert: 0,
  },

  Vintage: {
    Brightness: 105,
    Contrast: 110,
    Saturation: 90,
    HueRotate: 10,
    Blur: 0,
    Grayscale: 10,
    Sepia: 40,
    Opacity: 100,
    Invert: 0,
  },

  Cinematic: {
    Brightness: 95,
    Contrast: 130,
    Saturation: 85,
    HueRotate: 350,
    Blur: 0,
    Grayscale: 0,
    Sepia: 5,
    Opacity: 100,
    Invert: 0,
  },

  BlackAndWhite: {
    Brightness: 100,
    Contrast: 140,
    Saturation: 0,
    HueRotate: 0,
    Blur: 0,
    Grayscale: 100,
    Sepia: 0,
    Opacity: 100,
    Invert: 0,
  },

  Warm: {
    Brightness: 105,
    Contrast: 115,
    Saturation: 120,
    HueRotate: 10,
    Blur: 0,
    Grayscale: 0,
    Sepia: 15,
    Opacity: 100,
    Invert: 0,
  },

  Cool: {
    Brightness: 100,
    Contrast: 120,
    Saturation: 90,
    HueRotate: 190,
    Blur: 0,
    Grayscale: 0,
    Sepia: 0,
    Opacity: 100,
    Invert: 0,
  },

  Fade: {
    Brightness: 110,
    Contrast: 80,
    Saturation: 85,
    HueRotate: 0,
    Blur: 0,
    Grayscale: 0,
    Sepia: 10,
    Opacity: 100,
    Invert: 0,
  }
};


document.addEventListener('DOMContentLoaded', () => {

  Object.keys(presets).forEach(presetName => {
    const presetButton = document.createElement('button');
    presetButton.classList.add('btn');
    presetButton.innerText = presetName;
    presetsContainer.appendChild(presetButton);

    presetButton.addEventListener('click', () => {
      const preset = presets[presetName];

      Object.keys(preset).forEach(filtername => {
        filter[filtername].value = preset[filtername];
      });

      createfilters();
      applyFilters();
    });
  });

});
