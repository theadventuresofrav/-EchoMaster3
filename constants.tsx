
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
      { id: 't9_1', title: 'Axial Resolution (LARRD)', description: 'Explains how it\'s determined by Spatial Pulse Length (SPL).', longDescription: 'A visual (AxialResolutionVisual) shows how higher frequency improves axial resolution. Axial resolution is the ability to distinguish two structures that are front-to-back along the beam\'s path. It is determined by the Spatial Pulse Length (SPL). A shorter pulse (achieved with higher frequency) results in better axial resolution. It is often remembered by the acronym LARRD: Longitudinal, Axial, Range, Radial, Depth.', demo: AxialResolutionVisual },
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
    { id: 'f1_1_1', term: 'Mechanical Wave', definition: 'A wave that requires a medium (like body tissue) to propagate.' },
    { id: 'f1_1_2', term: 'Longitudinal Wave', definition: 'A wave where particle motion is parallel to the direction of wave propagation.' },
    { id: 'f1_1_3', term: 'Compression/Rarefaction', definition: 'The alternating regions of high and low pressure/density in a sound wave.' },
  ],
  t1_2: [
    { id: 'f1_2_1', term: 'Frequency', definition: 'The number of cycles per second (Hz). Determines resolution and penetration.' },
    { id: 'f1_2_2', term: 'Wavelength', definition: 'The physical length of one wave cycle. Inversely related to frequency.' },
    { id: 'f1_2_3', term: 'Amplitude', definition: 'A measure of the "strength" or magnitude of the sound wave.' },
  ],
  t1_3: [
    { id: 'f1_3_1', term: 'Acoustic Impedance', definition: 'A tissue\'s resistance to sound. Differences in impedance create echoes.' },
    { id: 'f1_3_2', term: 'Reflection', definition: 'The redirection of a portion of the sound beam back to the source.' },
    { id: 'f1_3_3', term: 'Attenuation', definition: 'The weakening of the sound beam as it travels through tissue.' },
  ],
  // Module 2
  t2_1: [
    { id: 'f2_1_1', term: 'Piezoelectric Effect', definition: 'The ability of PZT crystals to convert electrical energy to mechanical (sound) energy, and vice versa.' },
    { id: 'f2_1_2', term: 'Backing Material', definition: 'Material attached to the back of the PZT crystal to dampen the ringing and create a short pulse.' },
    { id: 'f2_1_3', term: 'Matching Layer', definition: 'A layer on the transducer face that reduces the impedance mismatch between the crystal and skin.' },
  ],
  t2_2: [
    { id: 'f2_2_1', term: 'Linear Array', definition: 'Transducer with crystals in a straight line, producing a rectangular image.' },
    { id: 'f2_2_2', term: 'Curvilinear Array', definition: 'Transducer with crystals in a curved line, producing a wide, trapezoidal image.' },
    { id: 'f2_2_3', term: 'Phased Array', definition: 'Transducer with a small footprint that steers the beam electronically to create a sector image.' },
  ],
  t2_3: [
    { id: 'f2_3_1', term: 'Focusing', definition: 'The narrowing of the ultrasound beam to improve lateral resolution.' },
    { id: 'f2_3_2', term: 'Focal Zone', definition: 'The region of the beam where it is narrowest and lateral resolution is best.' },
    { id: 'f2_3_3', term: 'Electronic Focusing', definition: 'Using small time delays between PZT elements to focus the beam electronically.' },
  ],
  // Module 3
  t3_1: [
    { id: 'f3_1_1', term: 'Pulse-Echo Principle', definition: 'The basis of ultrasound imaging: sending a sound pulse and timing the return of its echo.' },
    { id: 'f3_1_2', term: 'Range Equation', definition: 'The formula used by the machine to calculate the depth of a reflector: Depth = (c * t) / 2.' },
    { id: 'f3_1_3', term: '13 Microsecond Rule', definition: 'The rule of thumb stating that it takes 13 µs of travel time for every 1 cm of reflector depth.' },
  ],
  // Module 4
  t4_1: [
    { id: 'f4_1_1', term: 'Doppler Shift', definition: 'The change in frequency of a reflected wave, caused by the motion of an object (e.g., red blood cells).' },
    { id: 'f4_1_2', term: 'Doppler Angle', definition: 'The angle between the sound beam and the direction of blood flow. 0° is optimal, 90° yields no shift.' },
    { id: 'f4_1_3', term: 'BART', definition: 'Acronym: Blue Away, Red Towards. The standard color map for directional Doppler flow.' },
  ],
  t4_2: [
    { id: 'f4_2_1', term: 'Continuous Wave (CW) Doppler', definition: 'Doppler mode using two crystals; one transmits, one receives. No aliasing but has range ambiguity.' },
    { id: 'f4_2_2', term: 'Pulsed Wave (PW) Doppler', definition: 'Doppler mode using one crystal to pulse and listen. Range specific but subject to aliasing.' },
    { id: 'f4_2_3', term: 'Aliasing', definition: 'An artifact in PW Doppler where high velocities are incorrectly displayed as flowing in the opposite direction.' },
  ],
  // Module 5
  t5_1: [
    { id: 'f5_1_1', term: 'Mirror Image', definition: 'An artifact where a structure is duplicated on the opposite side of a strong reflector.' },
    { id: 'f5_1_2', term: 'Reverberation', definition: 'Multiple, equally spaced linear echoes caused by sound bouncing between two strong reflectors.' },
    { id: 'f5_1_3', term: 'Propagation Speed Error', definition: 'Artifact occurring when sound travels through a medium at a speed other than 1.54 mm/µs, causing incorrect structure placement.' },
  ],
  t5_2: [
    { id: 'f5_2_1', term: 'Acoustic Shadowing', definition: 'A signal void or dark area behind a highly attenuating structure like bone or a stone.' },
    { id: 'f5_2_2', term: 'Acoustic Enhancement', definition: 'An abnormally bright area behind a structure with low attenuation, such as a fluid-filled cyst.' },
    { id: 'f5_2_3', term: 'Edge Shadowing', definition: 'A narrow shadow that appears at the curved edge of a structure.' },
  ],
  // Module 6
  t6_1: [
    { id: 'f6_1_1', term: 'ALARA', definition: 'As Low As Reasonably Achievable. The guiding safety principle in ultrasound.' },
    { id: 'f6_1_2', term: 'Thermal Bioeffects', definition: 'The potential for tissue heating due to the absorption of ultrasound energy.' },
    { id: 'f6_1_3', term: 'Mechanical Bioeffects (Cavitation)', definition: 'The production and behavior of microbubbles in tissue due to pressure changes from the sound wave.' },
  ],
  t6_2: [
    { id: 'f6_2_1', term: 'Thermal Index (TI)', definition: 'An on-screen value that estimates the potential for tissue temperature rise.' },
    { id: 'f6_2_2', term: 'Mechanical Index (MI)', definition: 'An on-screen value that indicates the potential for mechanical bioeffects like cavitation.' },
    { id: 'f6_2_3', term: 'FDA Intensity Limit', definition: 'The maximum allowable intensity for diagnostic ultrasound (SPTA < 720 mW/cm²).' },
  ],
  // Module 7
  t7_1: [
    { id: 'f7_1_1', term: 'Laminar Flow', definition: 'Normal, smooth blood flow in parallel layers, fastest in the center.' },
    { id: 'f7_1_2', term: 'Turbulent Flow', definition: 'Chaotic, disorderly blood flow with varying speeds and directions, often seen post-stenosis.' },
    { id: 'f7_1_3', term: 'Vascular Resistance', definition: 'The opposition to blood flow. High resistance vessels feed muscles; low resistance vessels feed vital organs.' },
  ],
  t7_2: [
    { id: 'f7_2_1', term: 'Poiseuille\'s Law', definition: 'A principle stating that flow volume is most significantly affected by changes in vessel radius.' },
    { id: 'f7_2_2', term: 'Bernoulli Principle', definition: 'A principle stating that at a point of stenosis, blood velocity is high, but pressure is low.' },
    { id: 'f7_2_3', term: 'Stenosis', definition: 'A narrowing or constriction of a blood vessel.' },
  ],
  // Module 8
  t8_1: [
    { id: 'f8_1_1', term: 'Quality Assurance (QA)', definition: 'A program of routine testing to ensure the ultrasound system is functioning correctly.' },
    { id: 'f8_1_2', term: 'Tissue Phantom', definition: 'A device used for QA that mimics the acoustic properties of human tissue and contains various test objects.' },
    { id: 'f8_1_3', term: 'Doppler Phantom', definition: 'A QA device used to test the accuracy of Doppler velocity measurements.' },
  ],
  t8_2: [
    { id: 'f8_2_1', term: 'Dead Zone', definition: 'The region close to the transducer face where imaging cannot be performed.' },
    { id: 'f8_2_2', term: 'Registration Accuracy', definition: 'The ability of the system to place echoes in their correct positions.' },
    { id: 'f8_2_3', term: 'Sensitivity', definition: 'The ability of the system to detect weak echoes.' },
  ],
  // Module 9
  t9_1: [
    { id: 'f9_1_1', term: 'Axial Resolution', definition: 'The ability to distinguish two objects positioned one in front of the another along the beam axis.' },
    { id: 'f9_1_2', term: 'Spatial Pulse Length (SPL)', definition: 'The physical length of the ultrasound pulse. SPL determines axial resolution.' },
    { id: 'f9_1_3', term: 'LARRD', definition: 'Acronym for Axial Resolution: Longitudinal, Axial, Range, Radial, Depth.' },
  ],
  t9_2: [
    { id: 'f9_2_1', term: 'Lateral Resolution', definition: 'The ability to distinguish two objects positioned side-by-side, perpendicular to the beam axis.' },
    { id: 'f9_2_2', term: 'Beam Width', definition: 'The width of the ultrasound beam. Beam width determines lateral resolution.' },
    { id: 'f9_2_3', term: 'LATA', definition: 'Acronym for Lateral Resolution: Lateral, Angular, Transverse, Azimuthal.' },
  ],
  // Module 10
  t10_1: [
    { id: 'f10_1_1', term: 'Harmonic Frequency', definition: 'A frequency that is a multiple of the fundamental (transmitted) frequency.' },
    { id: 'f10_1_2', term: 'Non-Linear Propagation', definition: 'The process where the shape of the sound wave distorts as it travels, creating harmonic frequencies.' },
    { id: 'f10_1_3', term: 'Fundamental Frequency', definition: 'The original frequency transmitted by the transducer.' },
  ],
  t10_2: [
    { id: 'f10_2_1', term: 'Tissue Harmonic Imaging (THI)', definition: 'An imaging mode that processes echoes at the harmonic frequency to improve image quality.' },
    { id: 'f10_2_2', term: 'Contrast Resolution', definition: 'The ability to distinguish between tissues based on subtle variations in echogenicity. THI improves this.' },
    { id: 'f10_2_3', term: 'Artifact Reduction', definition: 'A key benefit of THI, as it reduces near-field clutter and reverberation artifacts.' },
  ],
  // Module 11
  t11_1: [
    { id: 'f11_1_1', term: 'Gain', definition: 'The first receiver function; controls the amplification of all returning echoes. Also called receiver gain.' },
    { id: 'f11_1_2', term: 'Time Gain Compensation (TGC)', definition: 'The second receiver function; applies variable amplification to compensate for attenuation at different depths.' },
    { id: 'f11_1_3', term: 'Compression', definition: 'The third receiver function; reduces the dynamic range of signals to a level the display can handle.' },
  ],
  t11_2: [
    { id: 'f11_2_1', term: 'A-Mode (Amplitude)', definition: 'A display mode showing echo amplitude on the y-axis versus depth on the x-axis.' },
    { id: 'f11_2_2', term: 'B-Mode (Brightness)', definition: 'The standard 2D grayscale imaging mode, where echo strength determines pixel brightness.' },
    { id: 'f11_2_3', term: 'M-Mode (Motion)', definition: 'A display mode showing the motion of structures along a single scan line over time.' },
  ],
};
