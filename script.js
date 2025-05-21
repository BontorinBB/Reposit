document.addEventListener('DOMContentLoaded', function() {
    const dice1 = document.getElementById('dice1');
    const dice2 = document.getElementById('dice2');
    const rollButton = document.getElementById('rollButton');
    const totalDisplay = document.getElementById('total');
    
    // Configuração inicial dos dados
    setupDice(dice1);
    setupDice(dice2);
    
    rollButton.addEventListener('click', rollDice);
    
    function setupDice(diceElement) {
        // Limpa os pontos existentes
        diceElement.innerHTML = '';
        
        // Cria todos os pontos possíveis (6)
        for (let i = 1; i <= 6; i++) {
            const dot = document.createElement('div');
            dot.className = `dot pos${i}`;
            diceElement.appendChild(dot);
        }
        
        // Mostra o valor inicial (1)
        updateDiceValue(diceElement, 1);
    }
    
    function updateDiceValue(diceElement, value) {
        const dots = diceElement.querySelectorAll('.dot');
        
        // Esconde todos os pontos
        dots.forEach(dot => {
            dot.style.opacity = '0';
        });
        
        // Mostra os pontos conforme o valor
        switch(value) {
            case 1:
                dots[2].style.opacity = '1'; // Centro
                break;
            case 2:
                dots[0].style.opacity = '1'; // Superior esquerdo
                dots[5].style.opacity = '1'; // Inferior direito
                break;
            case 3:
                dots[0].style.opacity = '1'; // Superior esquerdo
                dots[2].style.opacity = '1'; // Centro
                dots[5].style.opacity = '1'; // Inferior direito
                break;
            case 4:
                dots[0].style.opacity = '1'; // Superior esquerdo
                dots[1].style.opacity = '1'; // Superior direito
                dots[3].style.opacity = '1'; // Inferior esquerdo
                dots[4].style.opacity = '1'; // Inferior direito
                break;
            case 5:
                dots[0].style.opacity = '1'; // Superior esquerdo
                dots[1].style.opacity = '1'; // Superior direito
                dots[2].style.opacity = '1'; // Centro
                dots[3].style.opacity = '1'; // Inferior esquerdo
                dots[4].style.opacity = '1'; // Inferior direito
                break;
            case 6:
                dots[0].style.opacity = '1'; // Superior esquerdo
                dots[1].style.opacity = '1'; // Superior direito
                dots[3].style.opacity = '1'; // Inferior esquerdo
                dots[4].style.opacity = '1'; // Inferior direito
                dots[2].style.opacity = '1'; // Centro esquerdo (meio)
                dots[5].style.opacity = '1'; // Centro direito (meio)
                break;
        }
    }
    
    function rollDice() {
        // Desabilita o botão durante a animação
        rollButton.disabled = true;
        totalDisplay.classList.remove('show');
        
        // Define os valores finais aleatórios
        const finalValue1 = Math.floor(Math.random() * 6) + 1;
        const finalValue2 = Math.floor(Math.random() * 6) + 1;
        
        // Contador de frames da animação
        let frames = 0;
        const totalFrames = 20;
        
        // Animação de rolagem
        const rollInterval = setInterval(() => {
            frames++;
            
            // Gera valores aleatórios durante a animação
            const tempValue1 = Math.floor(Math.random() * 6) + 1;
            const tempValue2 = Math.floor(Math.random() * 6) + 1;
            
            updateDiceValue(dice1, tempValue1);
            updateDiceValue(dice2, tempValue2);
            
            // Adiciona efeito de "sacudir" os dados
            if (frames < totalFrames / 2) {
                dice1.style.transform = `rotate(${frames * 10}deg)`;
                dice2.style.transform = `rotate(${-frames * 10}deg)`;
            } else {
                dice1.style.transform = `rotate(${(totalFrames - frames) * 10}deg)`;
                dice2.style.transform = `rotate(${-(totalFrames - frames) * 10}deg)`;
            }
            
            // Finaliza a animação
            if (frames >= totalFrames) {
                clearInterval(rollInterval);
                
                // Define os valores finais
                updateDiceValue(dice1, finalValue1);
                updateDiceValue(dice2, finalValue2);
                dice1.style.transform = 'rotate(0deg)';
                dice2.style.transform = 'rotate(0deg)';
                
                // Mostra o total
                const total = finalValue1 + finalValue2;
                totalDisplay.textContent = `Total: ${total}`;
                totalDisplay.classList.add('show');
                
                // Reabilita o botão
                rollButton.disabled = false;
            }
        }, 100);
    }
});
