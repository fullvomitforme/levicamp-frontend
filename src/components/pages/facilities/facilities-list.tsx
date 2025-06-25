import { Bookmark } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Animation variants
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.3,
		},
	},
};

const cardVariants = {
	hidden: { opacity: 0, y: 50 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			ease: [0.25, 0.1, 0.25, 1],
		},
	},
};

export default function FacilitiesList() {
	return (
		<section className='bg-secondary/40 py-16'>
			{/* Facilities */}
			<div className='flex flex-col justify-between mx-auto container'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className='flex flex-col justify-start items-start mb-8'
				>
					<div className='flex items-center gap-2 bg-secondary shadow-sm p-4 rounded-full font-semibold text-secondary-foreground'>
						<Bookmark className='w-5 h-5 text-current' />
						Our Facilities
					</div>
				</motion.div>

				<motion.div
					className='mx-auto w-full'
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-100px' }}
				>
					<motion.div variants={cardVariants}>
						<FacilityCard
							imageUrl='/assets/facilities/waterfall.jpg'
							title='Escape the city, breathe in fresh air, and soak in stunning valley views.'
							description='Jauh dari keramaian kota, temukan ketenangan dengan udara segar dan panorama lembah yang memukau.'
							color='#FFFDF6'
						/>
					</motion.div>

					<motion.div
						className='flex justify-end w-full'
						variants={cardVariants}
					>
						<FacilityCard
							imagePosition='right'
							imageUrl='/assets/facilities/tents.jpg'
							title='Cozy, spacious tents with comfy beds and everything you need to chill.'
							description='Tenda luas dengan tempat tidur nyaman dan fasilitas lengkap untuk memastikan pengalaman menginap yang santai.'
							color='#FAF6E9'
						/>
					</motion.div>

					<motion.div variants={cardVariants}>
						<FacilityCard
							imageUrl='/assets/facilities/tent.jpg'
							title='Stay fresh & connected with clean restrooms, free Wi-Fi, and breakfast on us.'
							description='Tempat pembersihan bersih dan nyaman dengan fasilitas Wi-Fi gratis dan sarapan gratis untuk memastikan pengalaman menginap yang nyaman.'
							color='#DDEB9D'
						/>
					</motion.div>

					<motion.div
						className='flex justify-end w-full'
						variants={cardVariants}
					>
						<FacilityCard
							imagePosition='right'
							imageUrl='/assets/facilities/rabbit.jpg'
							title='Feed & Bond – Get Up Close with Nature’s Friends!'
							description='Dapatkan pengalaman yang tak terlupakan dengan berinteraksi langsung dengan teman alam kami.'
							color='#A0C878'
						/>
					</motion.div>

					<motion.div variants={cardVariants}>
						<FacilityCard
							imageUrl='/assets/facilities/atv.jpg'
							title='Experience the thrill off-road ATV rides.'
							description='Nikmati pengalaman yang seru dengan mengendarai ATV melintasi medan yang menantang.'
							color='#F0BB78'
						/>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}

// Facility card component
export interface FacilityCardProps {
	imageUrl: string;
	title: string;
	description: string;
	imagePosition?: 'left' | 'right';
	color?: string;
}

export const FacilityCard = ({
	imageUrl,
	title,
	description,
	imagePosition = 'left',
	color,
}: FacilityCardProps) => {
	return (
		<Card
			className={`bg-secondary shadow-lg mb-6 border-none rounded-xl max-w-3xl overflow-hidden`}
			style={{ backgroundColor: color }}
		>
			<CardContent className='flex flex-row p-0'>
				{imagePosition === 'left' ? (
					<>
						<div className='w-[40%]'>
							<Image
								src={imageUrl}
								alt={title}
								width={220}
								height={220}
								className='w-full h-full object-cover'
							/>
						</div>
						<div className='p-6 w-[60%]'>
							<h3 className='mb-4 font-bold text-secondary-foreground text-2xl'>
								{title}
							</h3>
							<p className='text-gray-700'>{description}</p>
						</div>
					</>
				) : (
					<>
						<div className='p-6 w-[60%]'>
							<h3 className='mb-4 font-bold text-secondary-foreground text-2xl'>
								{title}
							</h3>
							<p className='text-gray-700'>{description}</p>
						</div>
						<div className='w-[40%]'>
							<Image
								src={imageUrl}
								alt={title}
								width={220}
								height={220}
								className='w-full h-full object-cover'
							/>
						</div>
					</>
				)}
			</CardContent>
		</Card>
	);
};
