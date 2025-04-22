/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import HeroSection from '@/components/common/hero-section';
import InvoiceDetail from '@/components/pages/reservation/invoice/invoice-detail';
import { ReservationStepper } from '@/components/pages/reservation/reservation-stepper';
import { Button } from '@/components/ui/button';
import { Confetti } from '@/components/ui/confetti';
import { useHydration } from '@/hooks/use-hydration';
import { useReservationStore } from '@/store/useReservationStore';

export default function InvoicePage() {
	const params = useParams();
	const bookingId = params.bookingId as string;
	const [loading, setLoading] = useState(true);
	const isHydrated = useHydration();
	const [showConfetti, setShowConfetti] = useState(true);

	const { reservationData, personalInfo, bookingResponseData, paymentData } =
		useReservationStore();

	useEffect(() => {
		if (!isHydrated) return;

		// Verify that we have the required data
		if (
			!reservationData ||
			!personalInfo ||
			!bookingResponseData ||
			!paymentData
		) {
			// If missing data, you could either redirect or attempt to fetch it using the bookingId
			console.error('Missing required data for invoice');
		}

		setLoading(false);
	}, [
		isHydrated,
		reservationData,
		personalInfo,
		bookingResponseData,
		paymentData,
	]);

	const handleDownload = () => {
		alert('Download functionality will be implemented here');
	};

	if (loading) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<div className='border-b-4 border-blue-500 rounded-full w-16 h-16 animate-spin'></div>
			</div>
		);
	}

	// Format dates for display
	const formattedCheckInDate = reservationData?.checkInDate
		? format(new Date(reservationData.checkInDate), 'EEE, MMM dd yyyy')
		: 'N/A';

	const formattedCheckOutDate = reservationData?.checkOutDate
		? format(new Date(reservationData.checkOutDate), 'EEE, MMM dd yyyy')
		: 'N/A';

	const paymentDate = paymentData?.payment?.created_at
		? format(new Date(paymentData.payment.created_at), 'MMMM d, yyyy')
		: 'N/A';

	// Prepare tents data for the InvoiceDetail component
	const tents =
		reservationData?.selectedTents?.map((tent) => ({
			id: tent.id,
			name: tent.name,
			image: tent.tent_images[0],
			category: tent.category?.name || 'Standard',
			capacity: tent.capacity,
			price: tent.api_price || tent.weekend_price || 0,
		})) || [];

	return (
		<>
			{showConfetti && (
				<Confetti
					style={{
						position: 'fixed',
						width: '100%',
						height: '100%',
						zIndex: 100,
						pointerEvents: 'none',
					}}
					options={{
						particleCount: 100,
						spread: 70,
						origin: { y: 0.3 },
					}}
				/>
			)}

			<HeroSection
				title='Thank you for choosing Levi Camp!'
				description='Here’s your invoice. Download it, screenshot it, or check your email for a copy.'
				showActionButtons={true}
			>
				<div className='mx-auto my-24 px-4 container'>
					<div className='hidden md:block mb-8'>
						<ReservationStepper currentStep={5} />
					</div>
					<InvoiceDetail
						bookingId={bookingId}
						paymentDate={paymentDate}
						guestName={personalInfo?.name || ''}
						guestEmail={personalInfo?.email || ''}
						guestPhone={personalInfo?.phone || ''}
						guestCount={personalInfo?.guestCount || '1'}
						checkInDate={formattedCheckInDate}
						checkOutDate={formattedCheckOutDate}
						tents={tents}
						totalPrice={reservationData?.totalPrice || 0}
						onDownload={handleDownload}
					/>
				</div>
			</HeroSection>
		</>
	);
}
