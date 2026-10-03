import { motion } from "framer-motion";
import { KineticText } from "../components/KineticText";
import FluidCard from "../components/FluidCard";

export default function Banner() {
  return (
    // We render a fixed-size container perfectly matching LinkedIn's banner specs (1584x396)
    // To capture this, the user can open Chrome DevTools, right-click this element, and select "Capture node screenshot"
    <div className="w-screen h-screen flex items-center justify-center bg-[#0A0A0A]">
      <div 
        id="linkedin-banner-capture"
        className="relative overflow-hidden flex items-center justify-center bg-void"
        style={{ width: "1584px", height: "396px" }}
      >
        {/* Background Mesh (Manually scaled for this fixed dimension) */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #FFFFFF 1px, transparent 1px),
              linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px"
          }}
        />
        
        {/* Orbs */}
        <div className="absolute top-[-50%] left-[-10%] w-[1200px] h-[1200px] rounded-full mix-blend-normal opacity-40 blur-[120px] bg-[#1F2229]" />
        <div className="absolute top-[10%] right-[-20%] w-[800px] h-[800px] rounded-full mix-blend-normal opacity-40 blur-[120px] bg-[#00E5C0]" />

        {/* Content */}
        <div className="relative z-10 w-full px-24 flex items-center justify-end">
          <FluidCard className="liquid-glass border border-line-dark rounded-3xl p-10 w-full max-w-[480px]">
             {/* Name & Role */}
             <div className="mb-8 border-b border-chalk/10 pb-6">
                <KineticText 
                  text="daryl tumaneng." 
                  className="font-display font-medium text-6xl tracking-tighter leading-none text-chalk lowercase mb-3" 
                  delay={0}
                />
                <p className="font-mono text-neon text-sm tracking-widest lowercase">
                  front-end developer
                </p>
             </div>

             {/* Contact Details */}
             <div className="font-mono text-sm text-chalk/80 leading-relaxed uppercase tracking-wider space-y-4">
               <div className="flex justify-between border-b border-chalk/10 pb-2 gap-4">
                 <span className="opacity-50">email</span>
                 <span className="font-semibold text-chalk text-right">dctumaneng13@gmail.com</span>
               </div>
               <div className="flex justify-between border-b border-chalk/10 pb-2 gap-4">
                 <span className="opacity-50">phone</span>
                 <span className="font-semibold text-chalk text-right">0969-596-7105</span>
               </div>
               <div className="flex justify-between gap-4">
                 <span className="opacity-50">location</span>
                 <span className="font-semibold text-chalk text-right">plaridel, bulacan</span>
               </div>
             </div>
          </FluidCard>
        </div>
      </div>
    </div>
  );
}
