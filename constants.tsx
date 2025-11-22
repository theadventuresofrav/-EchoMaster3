
import React from 'react';
import { 
    WavesIcon, TransducerIcon, PulsedWaveIcon, DopplerIcon, ArtifactsIcon, BioeffectsIcon, 
    HemodynamicsIcon, QualityAssuranceIcon, ResolutionIcon, HarmonicsIcon, InstrumentationIcon 
} from './components/icons';
import type { Module, FlashcardData } from './types';

// Import all new demo components
import LongitudinalWaveVisual from './components/demos/spi/LongitudinalWaveVisual';
import WaveParametersVisual from './components/demos/spi/WaveParametersVisual';
import TissueInteractionVisual from './components/demos/spi/TissueInteractionVisual';
import TransducerAnatomyVisual from './components/demos/spi/TransducerAnatomyVisual';
import ArrayTypesVisual from './components/demos/spi/ArrayTypesVisual';
import BeamFocusingVisual from './components/demos/spi/BeamFocusingVisual';
import PulseEchoPrincipleVisual from './components/demos/spi/PulseEchoPrincipleVisual';
import DopplerPrincipleVisual from './components/demos/spi/DopplerPrincipleVisual';
import DopplerModesVisual from './components/demos/spi/DopplerModesVisual';
import PropagationArtifactsVisual from './components/demos/spi/PropagationArtifactsVisual';
import AttenuationArtifactsVisual from './components/demos/spi/AttenuationArtifactsVisual';
import BioeffectMechanismsVisual from './components/demos/spi/BioeffectMechanismsVisual';
import SafetyIndicesVisual from './components/demos/spi/SafetyIndicesVisual';
import FlowPatternsVisual from './components/demos/spi/FlowPatternsVisual';
import PhysicalPrinciplesVisual from './components/demos/spi/PhysicalPrinciplesVisual';
import QaPhantomVisual from './components/demos/spi/QaPhantomVisual';
import KeyPerformanceParametersVisual from './components/demos/spi/QaPhantomVisual'; // Reusing for now
import AxialResolutionVisual from './components/demos/spi/AxialResolutionVisual';
import LateralResolutionVisual from './components/demos/spi/LateralResolutionVisual';
import NonLinearPropagationVisual from './components/demos/spi/NonLinearPropagationVisual';
import HarmonicImagingVisual from './components/demos/spi/HarmonicImagingVisual';
import ReceiverFunctionsVisual from './components/demos/spi/ReceiverFunctionsVisual';
import DisplayModesVisual from './components/demos/spi/DisplayModesVisual';

export const MODULES: Module[] = [
  {
    id: 'm1', title: 'Waves and Sound', icon: WavesIcon, topics: [
      { id: 't1_1', title: 'Introduction to Waves', description: 'Covers the definition of sound as a mechanical, longitudinal wave.', longDescription: 'Features an interactive visual (LongitudinalWaveVisual) demonstrating particle motion (compression & rarefaction) and the corresponding pressure wave. Sound used in ultrasound is a mechanical wave, meaning it needs a medium to travel through. It is also a longitudinal wave, where particles of the medium vibrate parallel to the direction of wave travel.', demo: LongitudinalWaveVisual },
      { id: 't1_2', title: 'Essential Wave Parameters', description: 'Details key parameters like wavelength, period, amplitude, and power.', longDescription: 'Includes an interactive visual (WaveParametersVisual) where you can adjust frequency and amplitude to see their effect on the wave\'s shape and calculated properties. Understanding wave parameters is crucial. Frequency (cycles per second) determines resolution and penetration. Wavelength is the physical length of a cycle.', demo: WaveParametersVisual },
      { id: 't1_3', title: 'Interaction with Media', description: 'Explains reflection, refraction, attenuation, and acoustic impedance.', longDescription: 'A simulation (TissueInteractionVisual) shows how different tissue boundaries affect the sound beam. As sound travels through the body, it encounters different tissues. At these boundaries, based on differences in acoustic impedance, the sound can be reflected (creating the echo for the image) or transmitted deeper. The weakening of sound as it travels is called attenuation.', demo: TissueInteractionVisual },
    ]
  },
  {
    id: 'm2', title: 'Transducers', icon: TransducerIcon, topics: [
        { id: 't2_1', title: 'Transducer Components & Piezoelectric Effect', description: 'Breaks down the transducer\'s anatomy (PZT crystal, backing material, matching layer) and the core principle of the piezoelectric effect.', longDescription: 'Features a visual (TransducerAnatomyVisual) of the components in action. The heart of the transducer is the PZT crystal, which exhibits the piezoelectric effect: it converts electricity into sound (transmission) and sound back into electricity (reception). Key components include the backing material to shorten the pulse and a matching layer to improve sound transmission into the skin.', demo: TransducerAnatomyVisual },
        { id: 't2_2', title: 'Array Types and Beam Formation', description: 'Compares Linear, Curvilinear (Convex), and Phased arrays.', longDescription: 'An interactive element (ArrayTypesVisual) shows the image shape and clinical application for each type. Different clinical applications require different transducer shapes, or "arrays". Linear arrays produce a rectangular image (vascular). Curvilinear arrays produce a wide, blunted sector image (abdomen). Phased arrays produce a pointed sector image from a small footprint (cardiac).', demo: ArrayTypesVisual },
        { id: 't2_3', title: 'Beam Focusing', description: 'Explains how focusing narrows the beam to improve lateral resolution.', longDescription: 'Demonstrates electronic focusing with a visual (BeamFocusingVisual). Focusing the ultrasound beam narrows its width at a specific depth. This is critical for improving lateral resolution, which is the ability to distinguish two objects side-by-side. Modern transducers use electronic focusing by applying small time delays to the crystals.', demo: BeamFocusingVisual },
    ]
  },
  {
    id: 'm3', title: 'Pulsed Wave Operation', icon: PulsedWaveIcon, topics: [
      { id: 't3_1', title: 'The Pulse-Echo Principle', description: 'Explains the fundamental Range Equation and the 13µs Rule.', longDescription: 'An interactive demo (PulseEchoPrincipleVisual) lets you drag a target to see how depth affects the echo\'s time-of-flight. Ultrasound imaging relies on the pulse-echo principle. The machine sends a short pulse of sound and listens for the echo. The "13 Microsecond Rule" is a critical shortcut: for every 13µs of go-return time, the reflector is 1 cm deep.', demo: PulseEchoPrincipleVisual },
    ]
  },
  {
    id: 'm4', title: 'Doppler Effect', icon: DopplerIcon, topics: [
      { id: 't4_1', title: 'The Doppler Principle', description: 'Covers the Doppler equation and the importance of the angle of incidence.', longDescription: 'Includes a visual (DopplerPrincipleVisual) showing how motion towards or away from the transducer changes the wave frequency. The Doppler effect describes the change in frequency caused by a moving source or reflector. In ultrasound, we measure the frequency shift from moving red blood cells to determine their velocity.', demo: DopplerPrincipleVisual },
      { id: 't4_2', title: 'Doppler Modalities', description: 'Differentiates between CW, PW, Color, and Power Doppler.', longDescription: 'An interactive demo (DopplerModesVisual) highlights the key characteristics and trade-offs of each mode (e.g., aliasing in PW, sensitivity in Power Doppler). Continuous Wave (CW) is for high velocities but has range ambiguity. Pulsed Wave (PW) is range-specific but can alias. Color Doppler provides a 2D map of average velocities.', demo: DopplerModesVisual },
    ]
  },
  {
    id: 'm5', title: 'Imaging Artifacts', icon: ArtifactsIcon, topics: [
      { id: 't5_1', title: 'Propagation Group Artifacts', description: 'Explains artifacts caused by the sound\'s path, like Reverberation and Mirror Image.', longDescription: 'Includes an interactive visual (PropagationArtifactsVisual) demonstrating these paths. Propagation artifacts arise from errors in the assumed path of the sound beam. "Mirror Image" occurs when the beam hits a strong reflector, creating a false image on the other side. "Reverberation" is caused by sound bouncing between two strong reflectors, creating multiple, equally spaced lines.', demo: PropagationArtifactsVisual },
      { id: 't5_2', title: 'Attenuation Group Artifacts', description: 'Covers artifacts caused by the weakening or strengthening of the beam, like Shadowing and Enhancement.', longDescription: 'A visual (AttenuationArtifactsVisual) shows how different structures create these effects. Attenuation artifacts are caused by unexpected weakening or strengthening of the beam. "Acoustic Shadowing" is a signal void behind a highly attenuating structure (like bone). "Enhancement" is an unusually bright area behind a low-attenuating structure (like a cyst).', demo: AttenuationArtifactsVisual },
    ]
  },
  {
    id: 'm6', title: 'Bioeffects and Safety', icon: BioeffectsIcon, topics: [
        { id: 't6_1', title: 'The ALARA Principle & Bioeffect Mechanisms', description: 'Defines ALARA and the two primary bioeffects (thermal and mechanical).', longDescription: 'A visual (BioeffectMechanismsVisual) demonstrates the difference between tissue heating and cavitation. The guiding principle of ultrasound safety is ALARA: As Low As Reasonably Achievable. The two primary bioeffect mechanisms are thermal (tissue heating from sound absorption) and mechanical (cavitation, the interaction of sound with microbubbles).', demo: BioeffectMechanismsVisual },
        { id: 't6_2', title: 'Safety Indices (TI and MI)', description: 'Explains the meaning of the on-screen Thermal Index (TI) and Mechanical Index (MI).', longDescription: 'An interactive dashboard (SafetyIndicesVisual) shows how machine settings affect these values. The Thermal Index (TI) is an estimate of the potential for tissue heating. The Mechanical Index (MI) is related to the likelihood of cavitation. Sonographers must monitor these values to ensure patient safety.', demo: SafetyIndicesVisual },
    ]
  },
  {
    id: 'm7', title: 'Hemodynamics', icon: HemodynamicsIcon, topics: [
        { id: 't7_1', title: 'Flow Patterns & Vascular Resistance', description: 'Differentiates laminar vs. turbulent flow and high-resistance vs. low-resistance waveforms.', longDescription: 'Includes a visual (FlowPatternsVisual) of these flow types. Hemodynamics is the study of blood flow. Normal flow is "laminar", with the fastest flow in the center. After a blockage (stenosis), flow becomes chaotic or "turbulent". Waveforms can be high-resistance (sharp upstroke, low flow in diastole) or low-resistance (more rounded peak, continuous forward flow).', demo: FlowPatternsVisual },
        { id: 't7_2', title: 'Physical Principles: Poiseuille & Bernoulli', description: 'Explains how vessel radius (Poiseuille\'s Law) and pressure/velocity relationships (Bernoulli Principle) affect flow.', longDescription: 'A simulation (PhysicalPrinciplesVisual) demonstrates these concepts. Poiseuille\'s Law shows that vessel radius has the greatest impact on flow volume (small change in radius leads to a large change in flow). The Bernoulli Principle states that at a stenosis, velocity is high but pressure is low.', demo: PhysicalPrinciplesVisual },
    ]
  },
  {
    id: 'm8', title: 'Quality Assurance', icon: QualityAssuranceIcon, topics: [
      { id: 't8_1', title: 'QA Principles and Phantoms', description: 'Explains the purpose of a QA program with a visual of a QA phantom (QaPhantomVisual).', longDescription: 'A Quality Assurance (QA) program involves routine testing to ensure the ultrasound system is functioning correctly and producing accurate data. This is typically done using tissue-mimicking phantoms, which contain targets at known locations to test various machine parameters.', demo: QaPhantomVisual },
      { id: 't8_2', title: 'Key Performance Parameters', description: 'Details the key metrics tested, such as the dead zone, resolution, and distance accuracy.', longDescription: 'QA testing assesses key performance metrics. The "dead zone" is the region near the top of the image where no data can be collected. Resolution (axial and lateral) is tested to ensure the machine can distinguish small objects. Distance measurement accuracy is also verified.', demo: KeyPerformanceParametersVisual },
    ]
  },
  {
    id: 'm9', title: 'Axial & Lateral Resolution', icon: ResolutionIcon, topics: [
      { id: 't9_1', title: 'Axial Resolution (LARRD)', description: 'Explains how it\'s determined by Spatial Pulse Length (SPL).', longDescription: 'Axial resolution is the ability to accurately distinguish two structures that are close to each other front-to-back (parallel to the sound beam\'s main axis). It is determined entirely by the Spatial Pulse Length (SPL). \n\n**The Formula:** Axial Resolution (mm) = SPL (mm) / 2.\n\n**Key Concept:** Shorter pulses create better images. To get a short pulse, we need either fewer cycles (damping) or shorter wavelengths (high frequency). Therefore, **High Frequency** transducers provide the best axial resolution because high frequency sound has short wavelengths, resulting in a shorter SPL. \n\n**LARRD Mnemonic:** Longitudinal, Axial, Range, Radial, Depth. \n\nUse the interactive visual below to see how pulse length affects the ability to resolve two distinct targets.', demo: AxialResolutionVisual },
      { id: 't9_2', title: 'Lateral Resolution (LATA)', description: 'Explains how it\'s determined by beam width.', longDescription: 'A visual (LateralResolutionVisual) demonstrates that lateral resolution is best at the focus. Lateral resolution is the ability to distinguish two structures that are side-by-side. It is determined by the beam width. A narrower beam provides better lateral resolution. It is best at the focus and is remembered by the acronym LATA: Lateral, Angular, Transverse, Azimuthal.', demo: LateralResolutionVisual },
    ]
  },
  {
    id: 'm10', title: 'Harmonics', icon: HarmonicsIcon, topics: [
      { id: 't10_1', title: 'Non-Linear Propagation', description: 'Explains how sound waves distort as they travel, creating harmonic frequencies.', longDescription: 'A visual (NonLinearPropagationVisual) shows this process. As the sound wave travels through tissue, it doesn\'t travel perfectly. The peaks travel slightly faster than the troughs, causing the wave shape to distort. This distortion creates new frequencies that are multiples of the original (fundamental) frequency. These are called harmonics.', demo: NonLinearPropagationVisual },
      { id: 't10_2', title: 'Tissue Harmonic Imaging (THI)', description: 'Describes the advantages of THI, primarily the reduction of near-field artifacts.', longDescription: 'A visual comparison (HarmonicImagingVisual) shows the difference in image quality. Tissue Harmonic Imaging (THI) is a processing technique where the machine listens for the harmonic frequencies returning from the tissue, instead of the fundamental frequency. Since harmonics are generated deeper in the tissue, this technique significantly reduces near-field artifacts and clutter, resulting in a cleaner image.', demo: HarmonicImagingVisual },
    ]
  },
  {
    id: 'm11', title: 'Instrumentation & Image Processing', icon: InstrumentationIcon, topics: [
      { id: 't11_1', title: 'Receiver Functions', description: 'Lists the receiver functions in order (Gain, TGC, Compression, Demodulation, Reject) and explains their purpose with a visual flowchart (ReceiverFunctionsVisual).', longDescription: 'After an echo returns to the transducer, the machine must process it. This is done by the receiver in a specific order: 1. Gain (amplification), 2. TGC (depth compensation), 3. Compression (reducing dynamic range), 4. Demodulation (shaping the signal), and 5. Reject (filtering noise).', demo: ReceiverFunctionsVisual },
      { id: 't11_2', title: 'Display Modes', description: 'Differentiates between A-Mode, B-Mode, and M-Mode with a visual comparison (DisplayModesVisual).', longDescription: 'Ultrasound information can be displayed in several ways. A-Mode (Amplitude Mode) is a graph of echo amplitude vs. depth. B-Mode (Brightness Mode) is the standard grayscale 2D image. M-Mode (Motion Mode) displays the motion of structures along a single line over time, offering excellent temporal resolution.', demo: DisplayModesVisual },
    ]
  },
];


export const FLASHCARDS: { [key: string]: FlashcardData[] } = {
  // Module 1
  t1_1: [
    { id: 'f1_1_1', term: 'Mechanical Wave', definition: 'A wave that requires a medium (like body tissue) to propagate; cannot travel in a vacuum.' },
    { id: 'f1_1_2', term: 'Longitudinal Wave', definition: 'A wave where particle motion is parallel to the direction of wave propagation.' },
    { id: 'f1_1_3', term: 'Compression', definition: 'The region of a sound wave where molecules are squeezed together (high pressure/density).' },
    { id: 'f1_1_4', term: 'Rarefaction', definition: 'The region of a sound wave where molecules are stretched apart (low pressure/density).' },
    { id: 'f1_1_5', term: 'Acoustic Variables', definition: 'Pressure, Density, and Distance (Particle Motion). These distinguish sound waves from other waves.' },
    { id: 'f1_1_6', term: 'Infrasound vs. Ultrasound', definition: 'Infrasound < 20 Hz; Audible 20Hz-20kHz; Ultrasound > 20 kHz.' },
    { id: 'f1_1_7', term: 'Constructive Interference', definition: 'Two in-phase waves combine to form a wave with greater amplitude.' },
  ],
  t1_2: [
    { id: 'f1_2_1', term: 'Frequency (f)', definition: 'Cycles per second (Hz). Determined by the source only. f = 1/Period.' },
    { id: 'f1_2_2', term: 'Period (T)', definition: 'Time for one cycle to occur. Determined by source only. T = 1/f.' },
    { id: 'f1_2_3', term: 'Wavelength (λ)', definition: 'Distance of one cycle. Determined by BOTH source and medium. λ = c / f.' },
    { id: 'f1_2_4', term: 'Propagation Speed (c)', definition: 'Speed sound travels through a medium. Avg soft tissue = 1.54 mm/µs or 1540 m/s.' },
    { id: 'f1_2_5', term: 'Stiffness vs. Speed', definition: 'Directly related. Stiffer media (like bone) have faster sound speeds. Bulk Modulus is the same as stiffness.' },
    { id: 'f1_2_6', term: 'Density vs. Speed', definition: 'Inversely related. Denser media (like lead) have slower sound speeds.' },
    { id: 'f1_2_7', term: 'Amplitude', definition: 'Difference between max/min value and the average. Measures "bigness". Units: Pascals, dB.' },
    { id: 'f1_2_8', term: 'Power', definition: 'Rate of energy transfer. Proportional to Amplitude squared. Units: Watts.' },
  ],
  t1_3: [
    { id: 'f1_3_1', term: 'Acoustic Impedance (Z)', definition: 'Resistance to sound traveling in a medium. Z = Density × Prop. Speed. Units: Rayls.' },
    { id: 'f1_3_2', term: 'Specular Reflection', definition: 'Reflection from a smooth boundary (e.g., diaphragm). Angle of incidence = Angle of reflection.' },
    { id: 'f1_3_3', term: 'Diffuse Reflection (Backscatter)', definition: 'Reflection from a rough surface (e.g., liver parenchyma). Sound scatters in random directions.' },
    { id: 'f1_3_4', term: 'Rayleigh Scattering', definition: 'Occurs when structure is smaller than wavelength (e.g., RBCs). Omni-directional. Related to Frequency^4.' },
    { id: 'f1_3_5', term: 'Snell\'s Law', definition: 'Governs refraction. Describes the relationship between angles and speeds. Transmission Angle depends on speed differences.' },
    { id: 'f1_3_6', term: 'Attenuation', definition: 'Loss of power/amplitude/intensity as sound travels. dB = 0.5 × f × path length (in soft tissue).' },
  ],
  // Module 2
  t2_1: [
    { id: 'f2_1_1', term: 'Piezoelectric Effect', definition: 'Conversion of electrical energy into sound energy (transmission) and sound into electricity (reception).' },
    { id: 'f2_1_2', term: 'Curie Point', definition: 'The temperature at which PZT is polarized. Heating above this destroys piezoelectric properties.' },
    { id: 'f2_1_3', term: 'Backing Material (Damping)', definition: 'Epoxy resin/tungsten attached to rear of crystal. Shortens SPL/PD, increases bandwidth, improves axial resolution.' },
    { id: 'f2_1_4', term: 'Matching Layer', definition: 'In front of PZT. Intermediate impedance between PZT and skin. Thickness is 1/4 wavelength.' },
    { id: 'f2_1_5', term: 'Bandwidth', definition: 'The range of frequencies in the pulse. Short pulses (damped) have wide bandwidth.' },
    { id: 'f2_1_6', term: 'Q-Factor', definition: 'Unitless number inversely related to bandwidth. Imaging probes have Low Q.' },
    { id: 'f2_1_7', term: 'Impedance Matching Order', definition: 'PZT > Matching Layer > Gel > Skin.' },
  ],
  t2_2: [
    { id: 'f2_2_1', term: 'Linear Sequential Array', definition: 'Rectangular image. Crystals fire in groups. Vertical dropout line if crystal breaks.' },
    { id: 'f2_2_2', term: 'Phased Array', definition: 'Sector image. Electronic steering and focusing. Erratic steering/focus if crystal breaks.' },
    { id: 'f2_2_3', term: 'Curvilinear (Convex) Array', definition: 'Blunted sector image. Crystals in an arc. Vertical dropout line if crystal breaks.' },
    { id: 'f2_2_4', term: 'Annular Phased Array', definition: ' concentric rings. Mechanical steering, electronic focusing. Horizontal dropout if ring breaks.' },
    { id: 'f2_2_5', term: 'Elevational Resolution', definition: 'Slice thickness. Measured perpendicular to the imaging plane. 1.5D arrays improve this.' },
    { id: 'f2_2_6', term: 'Vector Array', definition: 'Trapezoidal image (flat top sector). Combination of linear sequential and phased technologies.' },
  ],
  t2_3: [
    { id: 'f2_3_1', term: 'Focal Zone', definition: 'Region around the focus where the beam is narrow. Best lateral resolution.' },
    { id: 'f2_3_2', term: 'Near Zone (Fresnel)', definition: 'Region from transducer to focus. Beam converges.' },
    { id: 'f2_3_3', term: 'Far Zone (Fraunhofer)', definition: 'Region starting at focus and extending deeper. Beam diverges.' },
    { id: 'f2_3_4', term: 'Focal Depth', definition: 'Distance from transducer to focus. Determined by diameter and frequency.' },
    { id: 'f2_3_5', term: 'Beam Divergence', definition: 'Spread of beam in far field. Inversely related to diameter and frequency. (Less divergence is better).' },
  ],
  // Module 3
  t3_1: [
    { id: 'f3_1_1', term: 'Pulse Repetition Frequency (PRF)', definition: 'Number of pulses transmitted per second. Inversely related to depth.' },
    { id: 'f3_1_2', term: 'Pulse Repetition Period (PRP)', definition: 'Time from start of one pulse to start of next. Includes listening time. Inversely related to PRF.' },
    { id: 'f3_1_3', term: 'Duty Factor', definition: 'Percentage of time the system is transmitting. <1% for imaging, 100% for CW.' },
    { id: 'f3_1_4', term: 'Spatial Pulse Length (SPL)', definition: 'Distance of a pulse. # cycles × wavelength. Determines Axial Resolution.' },
    { id: 'f3_1_5', term: 'Pulse Duration', definition: 'Time ("talking time") of a pulse. # cycles × period. NOT adjustable by sonographer.' },
    { id: 'f3_1_6', term: '13 µs Rule', definition: 'For every 13µs of go-return time, reflector is 1cm deep. Total distance traveled is 2cm.' },
  ],
  // Module 4
  t4_1: [
    { id: 'f4_1_1', term: 'Doppler Shift Formula', definition: '2 × velocity × freq × cos(θ) / propagation speed.' },
    { id: 'f4_1_2', term: 'Cosine of Angle', definition: 'Cos(0°) = 1 (Max shift). Cos(60°) = 0.5. Cos(90°) = 0 (No shift).' },
    { id: 'f4_1_3', term: 'Positive vs Negative Shift', definition: 'Positive: Flow TOWARDS transducer (Reflected freq > Transmitted freq). Negative: Flow AWAY.' },
    { id: 'f4_1_4', term: 'Non-Directional Doppler', definition: 'Only measures presence of flow, not direction. Uses Power Doppler.' },
    { id: 'f4_1_5', term: 'Phase Quadrature', definition: 'Signal processing technique used in bidirectional Doppler to determine flow direction.' },
  ],
  t4_2: [
    { id: 'f4_2_1', term: 'Nyquist Limit', definition: 'The highest Doppler frequency/velocity that can be measured without aliasing. = PRF / 2.' },
    { id: 'f4_2_2', term: 'Fixing Aliasing', definition: '1. Increase Scale (PRF) 2. Lower Baseline 3. Lower Frequency 4. Use CW 5. Shallower View.' },
    { id: 'f4_2_3', term: 'Wall Filter', definition: 'Rejects low frequency Doppler shifts (clutter/ghosting) from moving tissue.' },
    { id: 'f4_2_4', term: 'Packet Size / Ensemble Length', definition: 'Number of pulses per scan line in Color Doppler. Higher packet = better velocity accuracy but lower frame rate.' },
    { id: 'f4_2_5', term: 'Spectral Broadening', definition: 'Filling in of the spectral window. Indicates turbulent flow or large sample volume.' },
    { id: 'f4_2_6', term: 'Crosstalk', definition: 'Mirror image artifact in spectral Doppler. Caused by gain too high or angle near 90°.' },
  ],
  // Module 5
  t5_1: [
    { id: 'f5_1_1', term: 'Reverberation', definition: 'Multiple, equally spaced echoes (ladder-like) caused by sound bouncing between two strong reflectors.' },
    { id: 'f5_1_2', term: 'Comet Tail', definition: 'Solid hyperechoic line directed downward. Merged reverberation. Seen with metal or gas.' },
    { id: 'f5_1_3', term: 'Mirror Image', definition: 'Replica of structure appears deeper than true structure. Mirror is always on straight line between transducer and artifact.' },
    { id: 'f5_1_4', term: 'Refraction (Ghosting)', definition: 'Second copy of reflector side-by-side. Occurs when sound bends at boundary.' },
    { id: 'f5_1_5', term: 'Lobe Artifacts', definition: 'Side lobes (single element) or Grating lobes (arrays). Energy off-axis creates lateral displacement. Reduced by Apodization.' },
    { id: 'f5_1_6', term: 'Range Ambiguity', definition: 'Deep reflection from previous pulse arrives after next pulse sent. Machine assumes it\'s shallow.' },
  ],
  t5_2: [
    { id: 'f5_2_1', term: 'Shadowing', definition: 'Hypoechoic region extending downward from a highly attenuating structure (bone, stone).' },
    { id: 'f5_2_2', term: 'Enhancement', definition: 'Hyperechoic region beneath tissues with abnormally low attenuation (fluid).' },
    { id: 'f5_2_3', term: 'Focal Enhancement (Banding)', definition: 'Hyperechoic horizontal region at the depth of the focus due to increased intensity.' },
    { id: 'f5_2_4', term: 'Edge Shadowing', definition: 'Hypoechoic region extending down from the edge of a curved reflector. caused by refraction (defocusing).' },
    { id: 'f5_2_5', term: 'Speed Error (Step-Off)', definition: 'If medium speed > 1.54, echo returns early -> placed too shallow. If < 1.54 -> too deep.' },
  ],
  // Module 6
  t6_1: [
    { id: 'f6_1_1', term: 'Stable Cavitation', definition: 'Oscillating microbubbles. They swell and contract but do NOT burst. Shear stresses.' },
    { id: 'f6_1_2', term: 'Transient (Inertial) Cavitation', definition: 'Bursting bubbles. Shock waves and very high temperatures. Threshold dependent (MI).' },
    { id: 'f6_1_3', term: 'Hydrophone', definition: 'Microphone used to measure acoustic output (pressure, intensity, period, PRP) in a water tank.' },
    { id: 'f6_1_4', term: 'In Vivo vs In Vitro', definition: 'In Vivo = "in the living body". In Vitro = "in glass" (test tube/petri dish).' },
    { id: 'f6_1_5', term: 'Epidemiology', definition: 'Study of the prevalence of disease/effects in populations. No confirmed bioeffects in fetal US to date.' },
  ],
  t6_2: [
    { id: 'f6_2_1', term: 'Thermal Index (TI)', definition: 'Predicts max temperature rise. TIS (Soft tissue), TIB (Bone at focus), TIC (Cranial bone).' },
    { id: 'f6_2_2', term: 'Mechanical Index (MI)', definition: 'Related to likelihood of cavitation. MI = Peak Rarefaction Pressure / sqrt(Frequency).' },
    { id: 'f6_2_3', term: 'SPTA (Spatial Peak Temporal Average)', definition: 'Intensity most relevant to tissue heating.' },
    { id: 'f6_2_4', term: 'AIUM Intensity Limits', definition: 'Unfocused beam: 100 mW/cm². Focused beam: 1000 mW/cm² (1 W/cm²).' },
  ],
  // Module 7
  t7_1: [
    { id: 'f7_1_1', term: 'Reynolds Number', definition: 'Predicts flow type. <1500 = Laminar. >2000 = Turbulent.' },
    { id: 'f7_1_2', term: 'Plug Flow', definition: 'Laminar flow where all layers travel at same speed (e.g., aorta entrance).' },
    { id: 'f7_1_3', term: 'Parabolic Flow', definition: 'Bullet-shaped laminar flow. Highest velocity in center, zero at walls.' },
    { id: 'f7_1_4', term: 'Phasic Flow', definition: 'Blood moves with variable velocity. Arterial = cardiac phase. Venous = respiration phase.' },
    { id: 'f7_1_5', term: 'Thrill vs Bruit', definition: 'Thrill = palpable vibration (touch). Bruit = audible murmur (sound). Both signs of turbulence.' },
  ],
  t7_2: [
    { id: 'f7_2_1', term: 'Hydrostatic Pressure', definition: 'Weight of blood pressing on vessel. Supine = 0 everywhere. Standing = + below heart, - above heart.' },
    { id: 'f7_2_2', term: 'Inspiration & Venous Flow', definition: 'Diaphragm down. Chest pressure decreases (Upper body flow ↑). Abdominal pressure increases (Leg flow ↓).' },
    { id: 'f7_2_3', term: 'Expiration & Venous Flow', definition: 'Diaphragm up. Chest pressure increases (Upper body flow ↓). Abdominal pressure decreases (Leg flow ↑).' },
    { id: 'f7_2_4', term: 'Transmural Pressure', definition: 'Pressure difference inside vs outside vessel. Determines vessel shape (distention).' },
  ],
  // Module 8
  t8_1: [
    { id: 'f8_1_1', term: 'Gold Standard', definition: 'The "perfect" technique (e.g., MRI or angiography) used to verify ultrasound results.' },
    { id: 'f8_1_2', term: 'Objective vs Subjective', definition: 'Objective = unbiased, factual. Subjective = influenced by experience/belief.' },
    { id: 'f8_1_3', term: 'Tissue Equivalent Phantom', definition: 'Mimics soft tissue speed (1540 m/s), attenuation, scattering. Evaluating grayscale/resolution.' },
    { id: 'f8_1_4', term: 'Doppler Phantom', definition: 'Contains moving belt or fluid pump. Evaluates PW/CW/Color velocity accuracy.' },
  ],
  t8_2: [
    { id: 'f8_2_1', term: 'Sensitivity', definition: 'Ability to display low-level echoes. Minimum, Normal, and Maximum sensitivity settings.' },
    { id: 'f8_2_2', term: 'Dead Zone', definition: 'Shallowest depth where uniform tissue texture appears. Assessed with shallowest pins.' },
    { id: 'f8_2_3', term: 'Registration Accuracy', definition: 'Vertical (depth) and Horizontal (perpendicular) distance measurement accuracy.' },
    { id: 'f8_2_4', term: 'Positive Predictive Value', definition: 'Proportion of positive tests that are truly positive. TP / (TP + FP).' },
  ],
  // Module 9
  t9_1: [
    { id: 'f9_1_1', term: 'Axial Resolution Definition', definition: 'The ability to accurately identify two structures that are very close together when they are parallel to the sound beam\'s main axis (front-to-back).' },
    { id: 'f9_1_2', term: 'LARRD Mnemonic', definition: 'Longitudinal, Axial, Range, Radial, Depth. These are all synonyms for Axial Resolution.' },
    { id: 'f9_1_3', term: 'Axial Resolution Formula', definition: 'Axial Res (mm) = Spatial Pulse Length (mm) / 2. \nNote: Lower numerical values indicate better resolution.' },
    { id: 'f9_1_4', term: 'Spatial Pulse Length (SPL)', definition: 'The length of a pulse in space. SPL = # of cycles × wavelength. It determines axial resolution.' },
    { id: 'f9_1_5', term: 'Role of Frequency', definition: 'High Frequency -> Shorter Wavelength -> Shorter SPL -> Better Axial Resolution (Lower number).' },
    { id: 'f9_1_6', term: 'Role of Damping', definition: 'Backing material reduces the "ringing" (number of cycles per pulse). Fewer cycles -> Shorter SPL -> Better Axial Resolution.' },
    { id: 'f9_1_7', term: 'Is it Adjustable?', definition: 'No. Axial resolution is fixed by the transducer design. The sonographer cannot change the SPL of a specific probe.' },
    { id: 'f9_1_8', term: 'Axial vs. Lateral', definition: 'Axial resolution is usually better (lower number) than lateral resolution because ultrasound pulses are typically shorter (SPL) than they are wide (beam width).' },
  ],
  t9_2: [
    { id: 'f9_2_1', term: 'Lateral Resolution', definition: 'Equal to beam diameter. Changes with depth. Best at focus.' },
    { id: 'f9_2_2', term: 'Improving Lateral Res', definition: '1. Focusing (narrower beam). 2. Higher Frequency (less divergence in far field).' },
    { id: 'f9_2_3', term: 'LATA', definition: 'Lateral, Angular, Transverse, Azimuthal.' },
  ],
  // Module 10
  t10_1: [
    { id: 'f10_1_1', term: 'Fundamental Frequency', definition: 'The frequency created by the transducer and transmitted into the body.' },
    { id: 'f10_1_2', term: 'Harmonic Frequency', definition: 'Twice the fundamental frequency. Created in the tissues, not the transducer.' },
    { id: 'f10_1_3', term: 'Creation of Harmonics', definition: 'Non-linear behavior. Sound travels faster in compressions, slower in rarefactions.' },
  ],
  t10_2: [
    { id: 'f10_2_1', term: 'Pulse Inversion Harmonics', definition: 'Sends two consecutive pulses (one normal, one inverted). Fundamental cancels out, Harmonics remain. Degrades temporal resolution.' },
    { id: 'f10_2_2', term: 'Power Modulation', definition: 'Sends two pulses (one strong, one weak). Subtracts them to isolate harmonics. Lowers frame rate.' },
    { id: 'f10_2_3', term: 'Contrast Agents (Microbubbles)', definition: 'Gas bubbles encapsulated in a shell. Create strong harmonic reflections due to non-linear expansion/contraction.' },
  ],
  // Module 11
  t11_1: [
    { id: 'f11_1_1', term: 'Amplification (Gain)', definition: 'Makes entire image brighter or darker. Does not improve signal-to-noise ratio.' },
    { id: 'f11_1_2', term: 'Compensation (TGC)', definition: 'Corrects for attenuation. Creates uniform brightness from top to bottom.' },
    { id: 'f11_1_3', term: 'Compression (Dynamic Range)', definition: 'Keeps grayscale content within range of human eye (20 shades). Units: dB.' },
    { id: 'f11_1_4', term: 'Demodulation', definition: 'Rectification (neg to pos) and Smoothing (enveloping). NOT adjustable.' },
    { id: 'f11_1_5', term: 'Reject (Threshold)', definition: 'Eliminates low-level noise echoes without affecting bright echoes.' },
  ],
  t11_2: [
    { id: 'f11_2_1', term: 'Scan Converter', definition: 'Stores information. Translates "spoke" format (US) to "video" format (Display). Analog or Digital.' },
    { id: 'f11_2_2', term: 'Pixel', definition: 'Smallest building block of a digital picture. Pixel density determines Spatial Resolution.' },
    { id: 'f11_2_3', term: 'Bit', definition: 'Binary Digit. Determines number of gray shades. 2^n (e.g., 4 bits = 16 shades). Contrast Resolution.' },
    { id: 'f11_2_4', term: 'Read vs Write Zoom', definition: 'Read = Post-processing (pixelated). Write = Pre-processing (resicans, high detail).' },
    { id: 'f11_2_5', term: 'Analog-to-Digital (A-to-D)', definition: 'Converts electrical signals (real world) into binary numbers (computer world).' },
  ],
};
