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

function criarTexturaSombra() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, 'rgba(0,0,0,0.55)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(canvas);
}

export default function OpenLaptop() {
  const containerRef = useRef(null);
  const hotspotRefs = useRef({});
  const [open, setOpen] = useState(false);
  const [ativo, setAtivo] = useState(null);
  const openRef = useRef(open);
  openRef.current = open;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- cena base ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 1.35, 4.3);
    camera.lookAt(0, 0.35, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    // --- luzes ---
    scene.add(new THREE.HemisphereLight(0x8888ff, 0x101014, 0.9));
    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(2.5, 4, 3);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x7c5cff, 0.6);
    rim.position.set(-3, 2, -2);
    scene.add(rim);

    // --- sombra de contato ---
    const sombra = new THREE.Mesh(
      new THREE.PlaneGeometry(2.6, 2.2),
      new THREE.MeshBasicMaterial({ map: criarTexturaSombra(), transparent: true })
    );
    sombra.rotation.x = -Math.PI / 2;
    sombra.position.y = -0.001;
    scene.add(sombra);

    // --- grupo principal (gira no eixo Y) ---
    const laptopGroup = new THREE.Group();
    scene.add(laptopGroup);

    // base / teclado
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x16171c, metalness: 0.5, roughness: 0.4 });
    const base = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.12, 1.5), baseMat);
    laptopGroup.add(base);

    const teclas = new THREE.Mesh(
      new THREE.BoxGeometry(1.85, 0.01, 0.75),
      new THREE.MeshStandardMaterial({ color: 0x0c0d10, roughness: 0.8 })
    );
    teclas.position.set(0, 0.065, -0.1);
    laptopGroup.add(teclas);

    const touchpadMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.55, 0.008, 0.35),
      new THREE.MeshStandardMaterial({ color: 0x1c1e24, roughness: 0.5, metalness: 0.3 })
    );
    touchpadMesh.position.set(0, 0.065, 0.55);
    laptopGroup.add(touchpadMesh);

    // marcador invisível do teclado / touchpad (pra projetar os pontos)
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
    const materiais = [
      new THREE.MeshStandardMaterial({ color: 0x16171c, metalness: 0.5, roughness: 0.4 }), // +X
      new THREE.MeshStandardMaterial({ color: 0x16171c, metalness: 0.5, roughness: 0.4 }), // -X
      new THREE.MeshStandardMaterial({ color: 0x18191f, metalness: 0.6, roughness: 0.35 }), // +Y (tampa externa)
      new THREE.MeshStandardMaterial({ map: telaTextura, roughness: 0.6 }), // -Y (tela, visível quando aberto)
      new THREE.MeshStandardMaterial({ color: 0x16171c, metalness: 0.5, roughness: 0.4 }), // +Z
      new THREE.MeshStandardMaterial({ color: 0x16171c, metalness: 0.5, roughness: 0.4 }), // -Z
    ];
    const tampa = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.06, 1.5), materiais);
    tampa.position.set(0, 0, 0.75);
    pivot.add(tampa);

    // marcadores da tela / webcam (filhos da tampa, giram junto com a dobradiça)
    const marcadorTela = new THREE.Object3D();
    marcadorTela.position.set(0, -0.032, 0);
    tampa.add(marcadorTela);

    const marcadorWebcam = new THREE.Object3D();
    marcadorWebcam.position.set(0, -0.032, 0.65);
    tampa.add(marcadorWebcam);

    // ângulo aberto/fechado, animado por lerp
    const ANGULO_FECHADO = 0;
    const ANGULO_ABERTO = -1.8;
    let anguloAtual = ANGULO_FECHADO;

    function ajustarTamanho() {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    }
    ajustarTamanho();
    window.addEventListener('resize', ajustarTamanho);

    // --- interação: arrastar pra girar, tap pra abrir/fechar ---
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

    // projeta um marcador 3D pra posição em pixels na tela
    const tempV = new THREE.Vector3();
    const tempNormalRef = new THREE.Vector3();

    function atualizarHotspot(nome, marcador, offsetNormalLocal) {
      const el = hotspotRefs.current[nome];
      if (!el) return;

      marcador.getWorldPosition(tempV);

      // ponto levemente deslocado ao longo da normal da superfície, pra checar se ela encara a câmera
      tempNormalRef.copy(offsetNormalLocal);
      marcador.localToWorld(tempNormalRef);
      const encaraCamera = tempNormalRef.clone().sub(tempV).dot(camera.position.clone().sub(tempV)) > 0;

      const projetado = tempV.clone().project(camera);
      const visivelNaTela = projetado.z < 1 && Math.abs(projetado.x) < 1.15 && Math.abs(projetado.y) < 1.15;

      if (encaraCamera && visivelNaTela && openRef.current) {
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

    let frameId;
    function animar() {
      frameId = requestAnimationFrame(animar);

      const alvo = openRef.current ? ANGULO_ABERTO : ANGULO_FECHADO;
      anguloAtual += (alvo - anguloAtual) * (reduceMotion ? 1 : 0.1);
      pivot.rotation.x = anguloAtual;

      if (autoGiro && !reduceMotion) {
        laptopGroup.rotation.y += 0.0018;
      } else if (!arrastando && Date.now() - ultimaInteracao > 4000) {
        autoGiro = true;
      }

      atualizarHotspot('teclado', marcadorTeclado, new THREE.Vector3(0, 1, 0));
      atualizarHotspot('touchpad', marcadorTouchpad, new THREE.Vector3(0, 1, 0));
      atualizarHotspot('tela', marcadorTela, new THREE.Vector3(0, -1, 0));
      atualizarHotspot('webcam', marcadorWebcam, new THREE.Vector3(0, -1, 0));

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

  return (
    <div className="max-w-md mx-auto flex flex-col items-center">
      <div className="relative w-full" style={{ aspectRatio: '4 / 3' }}>
        <div ref={containerRef} className="absolute inset-0" />

        {Object.keys(PARTES).map((id) => (
          <button
            key={id}
            ref={(el) => (hotspotRefs.current[id] = el)}
            onClick={() => setAtivo(id === ativo ? null : id)}
            aria-label={PARTES[id].label}
            aria-pressed={ativo === id}
            style={{ opacity: 0, transition: 'opacity 0.2s ease' }}
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center"
          >
            <span
              className={`absolute inset-0 rounded-full bg-[#7c5cff] ${
                ativo === id ? 'opacity-30' : 'opacity-25 animate-ping'
              }`}
            />
            <span
              className={`relative w-3 h-3 rounded-full border-2 border-white transition-colors ${
                ativo === id ? 'bg-[#7c5cff]' : 'bg-[#22d3ee]'
              }`}
            />
          </button>
        ))}

        <span className="absolute top-1/2 right-2 -translate-y-1/2 text-[12px] text-[#f4f3ef] bg-white/10 backdrop-blur px-4 py-2 rounded-full border border-white/10 pointer-events-none">
          Arraste pra girar
        </span>
      </div>

      <p className="text-[13px] text-[#5c5e66] mt-6">
        {open ? 'Clique pra fechar' : 'Clique pra abrir'}
      </p>

      {open && (
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
              Clique em um dos pontos no notebook pra saber o que é cada parte.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
