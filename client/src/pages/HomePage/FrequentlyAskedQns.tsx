import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import AddIcon from '@mui/icons-material/Add'

const FrequentlyAskedQns = () => {
  return (
    <div className="my-20 flex flex-col gap-14">
      <h1 className="text-3xl text-center font-bold">FAQs</h1>
      <div className="flex justify-center px-32">
        <div className="flex flex-col">
          <Accordion>
            <AccordionSummary
              expandIcon={<AddIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              style={{ backgroundColor: '#F3EFF5' }}
            >
              How can I trust the quality of the produce when ordering from
              different farmers?
            </AccordionSummary>
            <AccordionDetails>
              We prioritize transparency. Each farmer's profile provides details
              on their practices, and customer reviews offer insights. We
              facilitate direct communication between you and the farmers,
              ensuring a trustworthy connection.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<AddIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              style={{ backgroundColor: '#F3EFF5' }}
            >
              Is customization available for orders, or are they pre-set
              packages?
            </AccordionSummary>
            <AccordionDetails>
              Absolutely! Our platform empowers you to tailor your orders.
              Choose specific items, quantities, and preferred farmers to create
              a personalized shopping experience.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<AddIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              style={{ backgroundColor: '#F3EFF5' }}
            >
              What if I, as a farmer, cannot provide delivery services?
            </AccordionSummary>
            <AccordionDetails>
              No worries! You can still showcase your products for online
              visibility. Simply choose the option to display your produce
              without "Delivery Services" functionality. This allows consumers
              to see your offerings and contact you directly for further
              arrangements, fostering a seamless connection.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<AddIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              style={{ backgroundColor: '#F3EFF5' }}
            >
              How can I stay updated on a specific farmer's offerings and
              updates? Can I follow them on the platform?
            </AccordionSummary>
            <AccordionDetails>
              Absolutely! Our platform allows you to follow your favorite
              farmers. By doing so, you'll receive notifications about their
              latest produce, promotions, and any updates they share. It's a
              great way to stay connected and informed about your preferred
              farmers' offerings.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<AddIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              style={{ backgroundColor: '#F3EFF5' }}
            >
              Are there any membership or subscription fees for using the
              platform?
            </AccordionSummary>
            <AccordionDetails>
              No, our platform is free for both farmers and consumers to join.
              There are no membership or subscription fees. We believe in
              providing an open and accessible marketplace that benefits both
              farmers and consumers alike.
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  )
}

export default FrequentlyAskedQns
