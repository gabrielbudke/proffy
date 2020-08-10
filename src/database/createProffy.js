module.exports = async function(db, { proffyValue, classValue, classScheduleValues }) {
   //insert into proffys
   const insertedProffy = await db.run(`
      INSERT INTO proffys (
         name, avatar, whatsapp, bio
      ) VALUES (
         "${proffyValue.name}",
         "${proffyValue.avatar}",
         "${proffyValue.whatsapp}",
         "${proffyValue.bio}"
      );
   `);

   const proffy_id = insertedProffy.lastID;

   // insert into classes
   const insertedClass = await db.run(`
      INSERT INTO classes (
         subject, cost, proffy_id
      ) VALUES (
         "${classValue.subject}",
         "${classValue.cost}",
         "${proffy_id}"
      );
   `);

   const class_id = insertedClass.lastID;

   const insertedAllClasses = classScheduleValues.map(classSchedule => {
      return db.run(`
         INSERT INTO class_schedule (
            class_id,
            weekday,
            time_from,
            time_to
         ) VALUES (
            "${class_id}",
            "${classSchedule.weekday}",
            "${classSchedule.time_from}",
            "${classSchedule.time_to}"            
         );
      `)
   });

   await Promise.all(insertedAllClasses);

}