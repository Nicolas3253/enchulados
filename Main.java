import java.util.Locale;
import java.util.Scanner;

public class Main {

    private static final Scanner sc = new Scanner(System.in).useLocale(Locale.US);

    private static double leerDouble(String mensaje) {
        while (true) {
            System.out.print(mensaje);
            String linea = sc.nextLine().trim().replace(',', '.');
            try {
                return Double.parseDouble(linea);
            } catch (NumberFormatException e) {
                System.out.println("Entrada inválida. Escriba un número (ej: 3.5).");
            }
        }
    }

    private static int leerEntero(String mensaje) {
        while (true) {
            System.out.print(mensaje);
            String linea = sc.nextLine().trim();
            try {
                return Integer.parseInt(linea);
            } catch (NumberFormatException e) {
                System.out.println("Entrada inválida. Escriba un número entero.");
            }
        }
    }

    public static void main(String[] args) {
        int opcion;
        do {
            mostrarMenu();
            opcion = leerEntero("seleccione una opción: ");
            System.out.println();

            switch (opcion) {
                case 10:
                    ejercicio10();
                    break;
                case 11:
                    ejercicio11();
                    break;
                case 12:
                    ejercicio12();
                    break;
                case 13:
                    ejercicio13();
                    break;
                case 14:
                    ejercicio14();
                    break;
                case 15:
                    ejercicio15();
                    break;
                case 16:
                    ejercicio16();
                    break;
                case 17:
                    ejercicio17();
                    break;
                case 18:
                    ejercicio18();
                    break;
                case 19:
                    ejercicio19();
                    break;
                case 20:
                    ejercicio20();
                    break;
                case 21:
                    ejercicio21();
                    break;
                case 22:
                    ejercicio22();
                    break;
                case 23:
                    ejercicio23();
                    break;
                case 24:
                    ejercicio24();
                    break;
                case 25:
                    ejercicio25();
                    break;
                case 26:
                    ejercicio26();
                    break;
                case 27:
                    ejercicio27();
                    break;
                case 28:
                    ejercicio28();
                    break;
                case 29:
                    ejercicio29();
                    break;
                case 30:
                    ejercicio30();
                    break;
                case 0:
                    System.out.println("Fin del programa");
                    break;
                default:
                    System.out.println("La opción no válida elija entre 10 y 30 o 0 para salir");
            }
            System.out.println();
        } while (opcion != 0);

        sc.close();
    }

    private static void mostrarMenu() {
        System.out.println("-----------------------------------------------");
        System.out.println("(10) Ejercicio 10          (11) Ejercicio 11");
        System.out.println("(12) Ejercicio 12          (13) Ejercicio 13");
        System.out.println("(14) Ejercicio 14          (15) Ejercicio 15");
        System.out.println("(16) Ejercicio 16          (17) Ejercicio 17");
        System.out.println("(18) Ejercicio 18          (19) Ejercicio 19");
        System.out.println("(20) Ejercicio 20          (21) Ejercicio 21");
        System.out.println("(22) Ejercicio 22          (23) Ejercicio 23");
        System.out.println("(24) Ejercicio 24          (25) Ejercicio 25");
        System.out.println("(26) Ejercicio 22          (27) Ejercicio 27");
        System.out.println("(28) Ejercicio 24          (29) Ejercicio 29");
        System.out.println("(30) Ejercicio 30          (0) Salir");
        System.out.println("""


                """);
    }

    // ejericio 10
    public static void ejercicio10() {
        System.out.println("Ejercicio 10: Intercraambiar valores devariables");
        double a = leerDouble("Ingrese el valor de A: ");
        double b = leerDouble("Ingrese el valor de B: ");

        System.out.println("Antes del intercambio:   A = " + a + " B = " + b);

        double temp = a;
        a = b;
        b = temp;

        System.out.println("Después del intercambio: A = " + a + " B = " + b);
    }

    // ejericio 11
    public static void ejercicio11() {
        System.out.println("Ejercicio 11: hallar la hipotenusa");
        double c1 = leerDouble("Ingrese el cateto 1: ");
        double c2 = leerDouble("Ingrese el cateto 2: ");

        double hipotenusa = Math.sqrt(Math.pow(c1, 2) + Math.pow(c2, 2));

        System.out.println("La hipotenusa es: " + hipotenusa);
    }

    // ejericio 12
    public static void ejercicio12() {
        System.out.println("Ejercicio 12: pasar minutos a horas y minutos");
        int totalMinutos = leerEntero("Ingrese la cantidad de minutos: ");

        int horas = totalMinutos / 60;
        int minutos = totalMinutos % 60;

        System.out.println(totalMinutos + " minutos = " + horas + " hora(s) y " + minutos + " minuto(s)");
    }

    // ejericio 13
    public static void ejercicio13() {
        System.out.println("Ejercicio 13: Hallar el volumen de un cubo");
        double lado = leerDouble("Ingrese el lado del cubo: ");

        double volumen = Math.pow(lado, 3);

        System.out.println("El volumen del cubo es: " + volumen);
    }

    // ejericio 14
    public static void ejercicio14() {
        System.out.println("Ejercicio 14: Hallar el signo de un número");
        double numero = leerDouble("Ingrese un número: ");

        int signo;
        if (numero > 0) {
            signo = 1;
        } else if (numero < 0) {
            signo = -1;
        } else {
            signo = 0;
        }

        System.out.println("El signo de " + numero + " es: " + signo);
    }

    // ejericio 15
    public static void ejercicio15() {
        System.out.println("Ejercicio 15: Hallar el área de un triángulo");
        double base = leerDouble("Ingrese la base: ");
        double altura = leerDouble("Ingrese la altura: ");

        double area = (base * altura) / 2;

        System.out.println("El área del triángulo es: " + area);
    }

    // ejericio 16
    public static void ejercicio16() {
        System.out.println("Ejercicio 16: pasar km/h a m/s");
        double kmh = leerDouble("ingrese la velocidad en km/h: ");

        double ms = kmh / 3.6;

        System.out.println(kmh + " km/h = " + ms + " m/s");
    }

    // ejericio 17
    public static void ejercicio17() {
        System.out.println("Ejercicio 17: calcular la energía cinética");
        double masa = leerDouble("ingrese la masa (kg): ");
        double velocidad = leerDouble("ingrese la velocidad (m/s): ");

        double energia = 0.5 * masa * Math.pow(velocidad, 2);

        System.out.println("la energía cinética es: " + energia + " J");
    }

    // ejericio 18
    public static void ejercicio18() {
        System.out.println("ejercicio 18: hallar el punto medio");
        double x1 = leerDouble("ingrese x1: ");
        double y1 = leerDouble("ingrese y1: ");
        double x2 = leerDouble("ingrese x2: ");
        double y2 = leerDouble("ingrese y2: ");

        double xm = (x1 + x2) / 2;
        double ym = (y1 + y2) / 2;

        System.out.println("el punto medio es: (" + xm + ", " + ym + ")");
    }

    // ejericio 19
    public static void ejercicio19() {
        System.out.println("Ejercicio 19: Hallar el volumen de un cilindro");
        double radio = leerDouble("Ingrese el radio: ");
        double altura = leerDouble("Ingrese la altura: ");

        double volumen = Math.PI * Math.pow(radio, 2) * altura;

        System.out.println("El volumen del cilindro es: " + volumen);
    }

    // ejericio 20
    public static void ejercicio20() {
        System.out.println("Ejercicio 20: Pasar radianes a grados");
        double radianes = leerDouble("Ingrese el ángulo en radianes: ");

        double grados = radianes * 180 / Math.PI;

        System.out.println(radianes + " radianes = " + grados + " grados");
    }

    // ejericio 21
    public static void ejercicio21() {
        System.out.println("Ejercicio 21: Hallar al fuerza gravitacional");
        final double G = 6.674e-11; 

        double m1 = leerDouble("Ingrese la masa del objeto 1 (kg): ");
        double m2 = leerDouble("Ingrese la masa del objeto 2 (kg): ");
        double r = leerDouble("Ingrese la distancia entre ambos (m): ");

        if (r == 0) {
            System.out.println("La distancia no puede ser cero.");
            return;
        }

        double fuerza = G * m1 * m2 / Math.pow(r, 2);

        System.out.println("La fuerza gravitacional es: " + fuerza + " N");
    }

    // ejericio 22
    public static void ejercicio22() {
        System.out.println("Ejercicio 22: Hallar la distancia entre dos puntos");
        double x1 = leerDouble("Ingrese x1: ");
        double y1 = leerDouble("Ingrese y1: ");
        double x2 = leerDouble("Ingrese x2: ");
        double y2 = leerDouble("Ingrese y2: ");

        double distancia = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

        System.out.println("La distancia entre los puntos es: " + distancia);
    }

    // ejericio 23
    public static void ejercicio23() {
        System.out.println("Ejercicio 23: Hallar el área de un trapecio");
        double baseMayor = leerDouble("Ingrese la base mayor: ");
        double baseMenor = leerDouble("Ingrese la base menor: ");
        double altura = leerDouble("Ingrese la altura: ");

        double area = ((baseMayor + baseMenor) / 2) * altura;

        System.out.println("El área del trapecio es: " + area);
    }

    // ejericio 24
    public static void ejercicio24() {
        System.out.println("Ejercicio 24: Pasar de libras a kilogramos");
        double libras = leerDouble("Ingrese la masa en libras: ");

        double kilogramos = libras * 0.45359237;

        System.out.println(libras + " lb = " + kilogramos + " kg");
    }

    // ejericio 25
    public static void ejercicio25() {
        System.out.println("Ejercicio 25: Hallar la presión hidrostática");
        final double GRAVEDAD = 9.81; 

        double densidad = leerDouble("Ingrese la densidad del fluido (kg/m al cubo, agua = 1000): ");
        double profundidad = leerDouble("Ingrese la profundidad (m): ");

        double presion = densidad * GRAVEDAD * profundidad;

        System.out.println("La presión hidrostática es: " + presion + " Pa");
    }

    // ejericio 26
    public static void ejercicio26() {
        System.out.println("Ejercicio 26: Hallar el enésimo término de una progresión aritmética");
        double a1 = leerDouble("Ingrese el primer término (a1): ");
        double d = leerDouble("Ingrese la diferencia común (d): ");
        int n = leerEntero("Ingrese la posición n del término buscado: ");

        if (n < 1) {
            System.out.println("n debe ser un entero mayor o igual a 1.");
            return;
        }

        double an = a1 + (n - 1) * d;

        System.out.println("El término número " + n + " es: " + an);
    }

    /// ejericio 27
    public static void ejercicio27() {
        System.out.println("Ejercicio 27: Hallar el trabajo de una fuerza constante");
        double fuerza = leerDouble("Ingrese la fuerza (N): ");
        double desplazamiento = leerDouble("Ingrese el desplazamiento (m): ");
        double anguloGrados = leerDouble("ingrese el ángulo entre fuerza y desplazamiento (grados): ");

        double trabajo = fuerza * desplazamiento * Math.cos(Math.toRadians(anguloGrados));

        System.out.println("El trabajo realizado es: " + trabajo + " J)");
    }

    // ejericio 28
    public static void ejercicio28() {
        System.out.println("Ejercicio 28: pasar coordenadas polares a cartesianas");
        double r = leerDouble("Ingrese el radio (r): ");
        double anguloGrados = leerDouble("Ingrese el ángulo θ (grados): ");

        double theta = Math.toRadians(anguloGrados);
        double x = r * Math.cos(theta);
        double y = r * Math.sin(theta);

        System.out.println("Coordenadas cartesianas: (" + x + ", " + y + ")");
    }

    // ejericio 29
    public static void ejercicio29() {
        System.out.println("Ejercicio 29: hallar la resistencia toaal de resistencias");
        int cantidad = leerEntero("Cuántas resistencias hay en serie?: ");

        if (cantidad < 1) {
            System.out.println("Debe haber al menos una resistencia.");
            return;
        }

        double total = 0;
        for (int i = 1; i <= cantidad; i++) {
            total += leerDouble("Ingrese el valor de la resistencia " + i + " (ohmios): ");
        }

        System.out.println("La resistencia total es: " + total + " ohmios");
    }

    // ejericio 30
    public static void ejercicio30() {
        System.out.println("ejercicio 30: hallar la velocidad final");
        double v0 = leerDouble("Ingrese la velocidad inicial (m/s): ");
        double a = leerDouble("Ingrese la aceleración (m/s al cuadrado): ");
        double t = leerDouble("Ingrese el tiempo (s): ");

        double vf = v0 + a * t;

        System.out.println("La velocidad final es: " + vf + " m/s");
    }
}