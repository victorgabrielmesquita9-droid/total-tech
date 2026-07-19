'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const PARTES = {
  tela: {
    label: 'Tela',
    texto:
      'É onde as imagens são exibidas. A qualidade é medida pela resolução (quantos pixels) e pela taxa de atualização, em Hz — quantas vezes a imagem é redesenhada por segundo.',
  },
  webcam: {
    label: 'Webcam',
    texto:
      'Fica geralmente na borda de cima da tela e captura vídeo — usada em chamadas, videoconferências e reconhecimento facial.',
  },
  teclado: {
    label: 'Teclado',
    texto:
      'Cada tecla é um interruptor que avisa ao computador qual caractere ou comando foi pressionado. Um bom teclado tem curso de tecla confortável e resposta rápida.',
  },
  touchpad: {
    label: 'Touchpad',
    texto:
      'Substitui o mouse em notebooks — sente o movimento e a pressão dos dedos pra mover o cursor e simular cliques.',
  },
  bateria: {
    label: 'Bateria',
    texto:
      'Armazena energia pra o notebook funcionar longe da tomada. É medida em Wh (watt-hora) — quanto maior esse número, mais tempo de uso sem carregar.',
  },
  ram: {
    label: 'Memória RAM',
    texto:
      'Guarda temporariamente os dados que o notebook está usando agora. Mais RAM significa abrir mais programas ao mesmo tempo sem travar.',
  },
  ssd: {
    label: 'SSD (armazenamento)',
    texto:
      'Guarda o sistema operacional, os programas e seus arquivos. No formato M.2, é bem menor que um SSD de desktop e encaixa direto na placa-mãe.',
  },
  wifi: {
    label: 'Placa Wi-Fi',
    texto:
      'Placa pequena responsável pela conexão sem fio (Wi-Fi e Bluetooth) do notebook — uma das peças mais fáceis de trocar num upgrade.',
  },
  cooler: {
    label: 'Cooler',
    texto:
      'Puxa o ar quente de cima do processador pra fora do notebook, evitando que ele esquente demais durante o uso.',
  },
};

function criarTexturaTela() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 384;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#0b0b0e';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#7c5cff';
  ctx.font = 'bold 20px sans-serif';
  ctx.fillText('tutoriais.dev', 28, 44);
  const cores = ['#7c5cff', '#22d3ee', '#ff6f91', '#8d8f97'];
  let y = 90;
  for (let i = 0; i < 10; i++) {
    const largura = 60 + Math.random() * 300;
    ctx.fillStyle = cores[i % cores.length];
    ctx.globalAlpha = 0.85;
    ctx.fillRect(28 + (i % 3) * 20, y, largura, 12);
    y += 26;
  }
  ctx.globalAlpha = 1;
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function criarTexturaPlaca() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#0f2b1f';
  ctx.fillRect(0, 0, 256, 256);
  ctx.strokeStyle = 'rgba(180, 220, 200, 0.35)';
  ctx.lineWidth = 2;
  for (let i = 0; i < 14; i++) {
    ctx.beginPath();
    const x = Math.random() * 256;
    ctx.moveTo(x, 0);
    ctx.lineTo(x + (Math.random() * 40 - 20), 256);
    ctx.stroke();
  }
  return new THREE.CanvasTexture(canvas);
}

export default function OpenLaptop() {
  const containerRef = useRef(null);
  const hotspotRefs = useRef({});
  const [open, setOpen] = useState(false);
  const [internoAberto, setInternoAberto] = useState(false);
  const [ativo, setAtivo] = useState(null);
  const [removido, setRemovido] = useState({});

  const openRef = useRef(open);
  openRef.current = open;
  const internoRef = useRef(internoAberto);
  internoRef.current = internoAberto;
  const removidoRef = useRef(removido);
  removidoRef.current = removido;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 1.4, 4.5);
    camera.lookAt(0, 0.3, 0.15);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0x8888ff, 0x101014, 0.85));
    const key = new THREE.DirectionalLight(0xffffff, 1.15);
    key.position.set(2.4, 3.6, 2.6);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -2;
    key.shadow.camera.right = 2;
    key.shadow.camera.top = 2;
    key.shadow.camera.bottom = -2;
    key.shadow.camera.near = 0.5;
    key.shadow.camera.far = 8;
    key.shadow.bias = -0.002;
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x7c5cff, 0.5);
    rim.position.set(-3, 2, -2);
    scene.add(rim);

    const chao = new THREE.Mesh(new THREE.PlaneGeometry(6, 6), new THREE.ShadowMaterial({ opacity: 0.45 }));
    chao.rotation.x = -Math.PI / 2;
    chao.position.y = -0.07;
    chao.receiveShadow = true;
    scene.add(chao);

    const laptopGroup = new THREE.Group();
    scene.add(laptopGroup);

    const matChassi = new THREE.MeshPhysicalMaterial({
      color: 0x16171c,
      metalness: 0.5,
      roughness: 0.35,
      clearcoat: 0.4,
      clearcoatRoughness: 0.3,
    });

    const base = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.12, 1.5), matChassi);
    base.castShadow = true;
    base.receiveShadow = true;
    laptopGroup.add(base);

    const teclas = new THREE.Mesh(
      new THREE.BoxGeometry(1.85, 0.01, 0.75),
      new THREE.MeshStandardMaterial({ color: 0x0c0d10, roughness: 0.8 })
    );
    teclas.position.set(0, 0.065, -0.1);
    teclas.castShadow = true;
    laptopGroup.add(teclas);

    const touchpadMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.55, 0.008, 0.35),
      new THREE.MeshStandardMaterial({ color: 0x1c1e24, roughness: 0.5, metalness: 0.3 })
    );
    touchpadMesh.position.set(0, 0.065, 0.55);
    laptopGroup.add(touchpadMesh);

    const marcadorTeclado = new THREE.Object3D();
    marcadorTeclado.position.set(0, 0.07, -0.1);
    laptopGroup.add(marcadorTeclado);
    const marcadorTouchpad = new THREE.Object3D();
    marcadorTouchpad.position.set(0, 0.07, 0.6);
    laptopGroup.add(marcadorTouchpad);

    // dobradiça + tampa
    const pivot = new THREE.Object3D();
    pivot.position.set(0, 0.06, -0.75);
    laptopGroup.add(pivot);

    const telaTextura = criarTexturaTela();
    const materiaisTampa = [
      matChassi, matChassi,
      new THREE.MeshPhysicalMaterial({ color: 0x18191f, metalness: 0.55, roughness: 0.3, clearcoat: 0.5 }),
      new THREE.MeshStandardMaterial({ map: telaTextura, roughness: 0.6 }),
      matChassi, matChassi,
    ];
    const tampa = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.06, 1.5), materiaisTampa);
    tampa.position.set(0, 0, 0.75);
    tampa.castShadow = true;
    pivot.add(tampa);

    const marcadorTela = new THREE.Object3D();
    marcadorTela.position.set(0, -0.032, 0);
    tampa.add(marcadorTela);
    const marcadorWebcam = new THREE.Object3D();
    marcadorWebcam.position.set(0, -0.032, 0.65);
    tampa.add(marcadorWebcam);

    // --- bandeja de peças internas (desliza de baixo da base) ---
    const bandeja = new THREE.Group();
    bandeja.position.set(0, -0.09, 0);
    laptopGroup.add(bandeja);

    const placaMat = new THREE.MeshStandardMaterial({ map: criarTexturaPlaca(), roughness: 0.7 });
    const placa = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.02, 1.3), placaMat);
    placa.receiveShadow = true;
    bandeja.add(placa);

    const pecaMarcadores = {};
    function criarPeca(id, geometria, material, posX) {
      const grupo = new THREE.Group();
      grupo.position.set(posX, 0.02, 0.1);
      const mesh = new THREE.Mesh(geometria, material);
      mesh.castShadow = true;
      mesh.position.y = geometria.parameters.height ? geometria.parameters.height / 2 : 0.02;
      grupo.add(mesh);
      const marcador = new THREE.Object3D();
      marcador.position.set(0, (geometria.parameters.height || 0.05) + 0.05, 0);
      grupo.add(marcador);
      bandeja.add(grupo);
      pecaMarcadores[id] = { grupo, marcador, baseY: 0.02 };
    }

    criarPeca(
      'bateria',
      new THREE.BoxGeometry(0.55, 0.05, 0.7),
      new THREE.MeshStandardMaterial({ color: 0x2a2c33, roughness: 0.5, metalness: 0.4 }),
      -0.75
    );
    criarPeca(
      'ram',
      new THREE.BoxGeometry(0.06, 0.28, 0.55),
      new THREE.MeshStandardMaterial({ color: 0x1f7a4d, roughness: 0.6 }),
      -0.2
    );
    criarPeca(
      'ssd',
      new THREE.BoxGeometry(0.16, 0.015, 0.42),
      new THREE.MeshStandardMaterial({ color: 0x111214, roughness: 0.5, metalness: 0.5 }),
      0.25
    );
    criarPeca(
      'wifi',
      new THREE.BoxGeometry(0.14, 0.015, 0.18),
      new THREE.MeshStandardMaterial({ color: 0x1f7a4d, roughness: 0.6 }),
      0.55
    );
    criarPeca(
      'cooler',
      new THREE.CylinderGeometry(0.16, 0.16, 0.05, 24),
      new THREE.MeshStandardMaterial({ color: 0x0c0d10, roughness: 0.5, metalness: 0.5 }),
      0.85
    );

    function ajustarTamanho() {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    }
    ajustarTamanho();
    window.addEventListener('resize', ajustarTamanho);

    let arrastando = false;
    let moveu = false;
    let ultimoX = 0;
    let autoGiro = !reduceMotion;
    let ultimaInteracao = 0;

    function aoPressionar(e) {
      arrastando = true;
      moveu = false;
      ultimoX = e.clientX;
      autoGiro = false;
    }
    function aoMover(e) {
      if (!arrastando) return;
      const dx = e.clientX - ultimoX;
      ultimoX = e.clientX;
      if (Math.abs(dx) > 1) moveu = true;
      laptopGroup.rotation.y += dx * 0.012;
    }
    function aoSoltar() {
      if (!arrastando) return;
      arrastando = false;
      ultimaInteracao = Date.now();
      if (!moveu) setOpen((o) => !o);
    }

    renderer.domElement.style.touchAction = 'none';
    renderer.domElement.style.cursor = 'grab';
    renderer.domElement.addEventListener('pointerdown', aoPressionar);
    window.addEventListener('pointermove', aoMover);
    window.addEventListener('pointerup', aoSoltar);

    const tempV = new THREE.Vector3();
    const tempN = new THREE.Vector3();

    function atualizarHotspot(nome, marcador, offsetNormalLocal, condicaoVisivel) {
      const el = hotspotRefs.current[nome];
      if (!el) return;
      if (!condicaoVisivel) {
        el.style.opacity = '0';
        el.style.pointerEvents = 'none';
        return;
      }
      marcador.getWorldPosition(tempV);
      tempN.copy(offsetNormalLocal);
      marcador.localToWorld(tempN);
      const encaraCamera = tempN.clone().sub(tempV).dot(camera.position.clone().sub(tempV)) > 0;
      const projetado = tempV.clone().project(camera);
      const visivelNaTela = projetado.z < 1 && Math.abs(projetado.x) < 1.15 && Math.abs(projetado.y) < 1.15;

      if (encaraCamera && visivelNaTela) {
        const x = (projetado.x * 0.5 + 0.5) * container.clientWidth;
        const y = (1 - (projetado.y * 0.5 + 0.5)) * container.clientHeight;
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        el.style.opacity = '1';
        el.style.pointerEvents = 'auto';
      } else {
        el.style.opacity = '0';
        el.style.pointerEvents = 'none';
      }
    }

    const ANGULO_FECHADO = 0;
    const ANGULO_ABERTO = -1.8;
    let anguloAtual = ANGULO_FECHADO;
    let bandejaZAtual = 0;

    let frameId;
    function animar() {
      frameId = requestAnimationFrame(animar);

      const alvoLid = openRef.current ? ANGULO_ABERTO : ANGULO_FECHADO;
      anguloAtual += (alvoLid - anguloAtual) * (reduceMotion ? 1 : 0.1);
      pivot.rotation.x = anguloAtual;

      const alvoBandeja = internoRef.current ? 1.15 : 0;
      bandejaZAtual += (alvoBandeja - bandejaZAtual) * (reduceMotion ? 1 : 0.09);
      bandeja.position.z = bandejaZAtual;

      Object.entries(pecaMarcadores).forEach(([id, p]) => {
        const alvoY = removidoRef.current[id] ? p.baseY + 0.35 : p.baseY;
        p.grupo.position.y += (alvoY - p.grupo.position.y) * (reduceMotion ? 1 : 0.15);
      });

      if (autoGiro && !reduceMotion) {
        laptopGroup.rotation.y += 0.0018;
      } else if (!arrastando && Date.now() - ultimaInteracao > 4000) {
        autoGiro = true;
      }

      const bandejaVisivel = internoRef.current && bandejaZAtual > 0.3;
      atualizarHotspot('teclado', marcadorTeclado, new THREE.Vector3(0, 1, 0), true);
      atualizarHotspot('touchpad', marcadorTouchpad, new THREE.Vector3(0, 1, 0), true);
      atualizarHotspot('tela', marcadorTela, new THREE.Vector3(0, -1, 0), openRef.current);
      atualizarHotspot('webcam', marcadorWebcam, new THREE.Vector3(0, -1, 0), openRef.current);
      Object.entries(pecaMarcadores).forEach(([id, p]) => {
        atualizarHotspot(id, p.marcador, new THREE.Vector3(0, 1, 0), bandejaVisivel);
      });

      renderer.render(scene, camera);
    }
    animar();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', ajustarTamanho);
      window.removeEventListener('pointermove', aoMover);
      window.removeEventListener('pointerup', aoSoltar);
      renderer.domElement.removeEventListener('pointerdown', aoPressionar);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  const parte = ativo ? PARTES[ativo] : null;
  const idsPecas = ['bateria', 'ram', 'ssd', 'wifi', 'cooler'];

  return (
    <div className="max-w-md mx-auto flex flex-col items-center">
      <div className="relative w-full" style={{ aspectRatio: '4 / 3' }}>
        <div ref={containerRef} className="absolute inset-0" />

        {Object.keys(PARTES).map((id) => (
          <button
            key={id}
            ref={(el) => (hotspotRefs.current[id] = el)}
            onClick={() => {
              setAtivo(id === ativo ? null : id);
              if (idsPecas.includes(id)) {
                setRemovido((r) => ({ ...r, [id]: !r[id] }));
              }
            }}
            aria-label={PARTES[id].label}
            aria-pressed={ativo === id}
            style={{ opacity: 0, transition: 'opacity 0.2s ease' }}
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center"
          >
            <span
              className={`absolute inset-0 rounded-full ${
                idsPecas.includes(id) ? 'bg-[#ff6f91]' : 'bg-[#7c5cff]'
              } ${ativo === id ? 'opacity-30' : 'opacity-25 animate-ping'}`}
            />
            <span
              className={`relative w-3 h-3 rounded-full border-2 border-white transition-colors ${
                ativo === id ? (idsPecas.includes(id) ? 'bg-[#ff6f91]' : 'bg-[#7c5cff]') : 'bg-[#22d3ee]'
              }`}
            />
          </button>
        ))}

        <span className="absolute top-1/2 right-2 -translate-y-1/2 text-[12px] text-[#f4f3ef] bg-white/10 backdrop-blur px-4 py-2 rounded-full border border-white/10 pointer-events-none">
          Arraste pra girar
        </span>
      </div>

      <div className="flex items-center gap-3 mt-6">
        <p className="text-[13px] text-[#5c5e66]">{open ? 'Clique pra fechar' : 'Clique pra abrir'}</p>
        <span className="text-[#3a3a42]">·</span>
        <button
          onClick={() => setInternoAberto((v) => !v)}
          className="text-[13px] text-[#7c5cff] hover:text-[#9b82ff] font-medium"
        >
          {internoAberto ? 'Fechar peças internas' : 'Ver peças internas'}
        </button>
      </div>

      {(parte || internoAberto) && (
        <div className="w-full min-h-[92px] mt-4 bg-[#101014] border border-[rgba(255,255,255,0.08)] rounded-xl p-5">
          {parte ? (
            <>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7c5cff]">
                {parte.label}
              </span>
              <p className="text-sm text-[#c7c8cd] leading-relaxed mt-2">{parte.texto}</p>
            </>
          ) : (
            <p className="text-sm text-[#5c5e66]">
              Clique numa das peças na bandeja pra puxar ela e ver o que faz.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
