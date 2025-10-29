Things to be done for project to be finished:

Sort out dynamic routes for images - currently the StoredImageRenderer uses a static filepath to generate the same image.
Supabase documentation is quite good for this but I ran out of time this morning to sort much of it out.
I think this has the solution:
https://supabase.com/docs/reference/javascript/storage-from-getpublicurl
https://supabase.com/docs/guides/storage/serving/image-transformations

SQL queries could do with being a bit smoother - particularly where they have another SELECT statement in the WHERE clause

Styling for the properties routes - particularly the repairs and feedback routes

SQL queries need to add data to the correct tables when landlords add new properties, and when tenants assign themselves to a property (create-tenant and /properties/create)

Clear supabase tables and add new dummy data to test - landlord with multiple properties, repairs with multiple comments. Double check where
