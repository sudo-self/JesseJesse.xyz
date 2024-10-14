const snowflakeCount = 20; 
for (let i = 0; i < snowflakeCount; i++) {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    
    const randomX = Math.random() * 100;
    const randomDuration = Math.random() * 5 + 3;

  
    snowflake.style.left = `${randomX}vw`;
    snowflake.style.width = `${Math.random() * 5 + 2}px`;
    snowflake.style.height = snowflake.style.width;

  
    snowflake.style.animationDuration = `${randomDuration}s`;

    document.body.appendChild(snowflake);

  
    snowflake.addEventListener('animationiteration', () => {
        snowflake.classList.add('accumulated');
    });
}
