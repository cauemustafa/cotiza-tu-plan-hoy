import { organizationSchema, localBusinessSchema, websiteSearchSchema } from "@/lib/structured-data";

const StructuredData = () => {
  const siteUrl = organizationSchema.url || 'https://cotizatuplanhoy.cl';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSearchSchema(siteUrl)) }}
      />
    </>
  );
};

export default StructuredData;
