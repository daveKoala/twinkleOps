<template>
  <Layout>
    <div class="spa-page">
      <!-- Banner and Title Section -->
      <div class="banner-container" :style="{ backgroundImage: `url(${bannerUrl})` }">
        <div class="banner-overlay">
          <h1 class="page-title">{{ title }}</h1>
          <h2 class="page-subtitle">{{ subtitle }}</h2>
        </div>
      </div>

      <!-- Content Sections -->
      <div class="content-container">
        <!-- Map through content sections -->
        <div v-for="(section, index) in contentSections" :key="index" class="content-section">
          <ImageTextRow
            :imagePosition="index % 2 === 0 ? 'left' : 'right'"
            :imageUrl="section.imageUrl"
            :imageContainMode="true"
            :title="section.title"
            :body="section.body"
            imageMaxWidth="35%"
          />
        </div>
      </div>

      <!-- Contact Form -->
      <div class="contact-container">
        <h2 class="contact-title">Get in Touch</h2>
        <div class="contact-form">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="contactForm.name" placeholder="Your Name" />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="contactForm.email" placeholder="Your Email" />
          </div>

          <div class="form-group">
            <label for="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              v-model="contactForm.phone"
              placeholder="Your Phone Number"
            />
          </div>

          <div class="form-group">
            <label for="message">Message</label>
            <textarea
              id="message"
              v-model="contactForm.message"
              placeholder="How can we help you?"
            ></textarea>
          </div>

          <button class="submit-button" @click="handleSubmit">Book Now</button>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import Layout from '@/layouts/SingleColumnLayout.vue'
import ImageTextRow from '@/components/spa/row.vue'

interface ContentSection {
  imageUrl: string
  title: string
  body: string
}

interface ContactForm {
  message: string
  email: string
  phone: string
  name: string
}

const subtitle = 'Relax, Rejuvenate, Revitalize'
const bannerUrl = '/images/spa/lounging.webp'
const title = 'Fluffy Spa & Wellness Center'

const contentSections: ContentSection[] = [
  {
    body: "Is your favorite friend looking a little flat? Has your plush unicorn lost its bounce? Our special Fluff & Stuff service gives your cuddly companions the spa day they deserve! Our certified Stuffing Specialists will carefully examine each fuzzy friend, add premium cloud-soft filling to saggy spots, and give them a gentle fluff massage to restore their huggable shape.  Your rejuvenated teddy will be so fluffy, you might not recognize them – but they'll definitely remember you!",
    imageUrl: '/images/spa/fluffing-up.webp',
    title: 'Fluff & Stuff Therapy',
  },
  {
    body: "Using only premium organic products, our facial treatments are designed to hydrate, rejuvenate, and restore your skin's natural radiance.",
    title: 'Luxury Rejuvination Sessions',
    imageUrl: '/images/spa/facial.webp',
  },
  {
    body: "Even toys need a break sometimes! Join our \"Escape\" yoga sessions where you can stretch, breathe, and pretend you don't hear your name being called for the 100th time today. Our expert instructors understand that while you love your little cubs more than anything, sometimes we Toys need a peaceful moment to recharge. Don't worry - we won't tell the kids that you're secretly enjoying the quiet! Perfect for Toys of all experience levels.",
    imageUrl: '/images/spa/yoga.webp',
    title: 'Mindful Yoga Sessions',
  },
]

const contactForm = reactive<ContactForm>({
  message: '',
  email: '',
  phone: '',
  name: '',
})

const handleSubmit = () => {
  // Simple form validation
  if (!contactForm.name || !contactForm.email) {
    alert('Please fill in your name and email')
    return
  }

  // Show alert as requested
  alert(`Thank you for your inquiry, ${contactForm.name}! We'll contact you soon.`)

  // Reset form
  contactForm.message = ''
  contactForm.email = ''
  contactForm.phone = ''
  contactForm.name = ''
}
</script>

<style scoped>
.spa-page {
  font-family: 'Montserrat', 'Helvetica Neue', Arial, sans-serif;
  color: #333;
  line-height: 1.6;
}

.banner-container {
  background-position: center;
  background-size: cover;
  position: relative;
  height: 500px;
}

.banner-overlay {
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: absolute;
  text-align: center;
  display: flex;
  padding: 1rem;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
}

.page-title {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 1rem;
  font-size: 3rem;
  color: white;
}

.page-subtitle {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  font-size: 1.5rem;
  font-weight: 300;
  color: white;
}

.content-container {
  padding: 3rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.content-section {
  margin-bottom: 4rem;
}

.contact-container {
  background-color: #f8f8f8;
  padding: 4rem 1rem;
}

.contact-title {
  margin-bottom: 2rem;
  text-align: center;
  font-size: 2rem;
  color: #333;
}

.contact-form {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 8px;
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  display: block;
}

.form-group input,
.form-group textarea {
  border: 1px solid #ddd;
  font-family: inherit;
  border-radius: 4px;
  padding: 0.75rem;
  font-size: 1rem;
  width: 100%;
}

.form-group textarea {
  min-height: 120px;
  resize: vertical;
}

.submit-button {
  transition: background-color 0.3s;
  background-color: #8a5a44;
  border-radius: 4px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  display: block;
  padding: 1rem;
  color: white;
  border: none;
  width: 100%;
}

.submit-button:hover {
  background-color: #6d4736;
}

/* Responsive styles */
@media (max-width: 768px) {
  .banner-container {
    height: 350px;
  }

  .page-title {
    font-size: 2rem;
  }

  .page-subtitle {
    font-size: 1.2rem;
  }
}
</style>
